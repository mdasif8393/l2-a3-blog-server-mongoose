import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { IBlog } from './blog.interface';

const createBlogIntoDB = async (token: string, blog: Partial<IBlog>) => {
  const decodedUser = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  console.log({ decodedUser });

  //   const result = (await Blog.create(blog)).populate('user');

  //   return result;
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
