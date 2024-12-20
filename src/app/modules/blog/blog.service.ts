import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { User } from '../user/user.model';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDB = async (token: string, blog: Partial<IBlog>) => {
  const decodedUser = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const user = await User.findOne({ email: decodedUser?.email });

  blog.author = user?._id;
  const result = (await Blog.create(blog)).populate('author');

  return result;
};

export const BlogServices = {
  createBlogIntoDB,
};

/*

{
  decodedUser: {
    email: 'john@example.com',
    role: 'user',
    iat: 1734696516,
    exp: 1739880516
  }
}

*/
