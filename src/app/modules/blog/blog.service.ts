import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDB = async (token: string, blog: Partial<IBlog>) => {
  const decodedUser = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const user = await User.findOne({ email: decodedUser?.email });

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'user is not found');
  }

  blog.author = user?._id;
  const result = (await Blog.create(blog)).populate('author');

  return result;
};

const updateBlogIntoDB = async (
  _id: string,
  payload: Partial<IBlog>,
  token: string,
) => {
  // decode user
  const decodedUser = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  // if user not found throw error
  const user = await User.findOne({ email: decodedUser?.email });
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'user is not found');
  }

  // check author is matched or not
  const blog = await Blog.findById(_id);

  if (blog?.author.toString() !== user?._id.toString()) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You are not the of this Blog. You can not update this blog',
    );
  }
  const result = await Blog.findByIdAndUpdate(_id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteBlogFromDB = async (_id: string, token: string) => {
  // decode user
  const decodedUser = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  // if user not found throw error
  const user = await User.findOne({ email: decodedUser?.email });
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'user is not found');
  }

  // check author is matched or not
  const blog = await Blog.findById(_id);

  if (blog?.author.toString() !== user?._id.toString()) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You are not author of this Blog. You can not update this blog',
    );
  }
  const result = await Blog.findByIdAndDelete(_id);
  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
};
