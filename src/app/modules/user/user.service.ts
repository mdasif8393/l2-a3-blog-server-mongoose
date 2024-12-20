import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppError';
import { IUser, TLoginUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDb = async (user: Partial<IUser>) => {
  // check user exists or not in database
  const isUerExists = await User.findOne({ email: user.email });

  if (isUerExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User already exists');
  }

  // hash password before create user
  const hashedPassword = await bcrypt.hash(
    user?.password as string,
    Number(config.bcrypt_salt_rounds),
  );

  user.password = hashedPassword;

  const result = await User.create(user);

  return result;
};

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.findOne({ email: payload?.email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  // checking if the user is blocked

  const userStatus = user?.isBlocked;

  if (userStatus) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  //checking if the password is correct

  if (!(await bcrypt.compare(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //create token and sent to the  client

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  });

  return {
    accessToken,
  };
};

export const UserServices = {
  createUserIntoDb,
  loginUser,
};

/*

{
  user: {
    _id: new ObjectId('67651350b385a8e952f368dc'),
    name: 'John Doe',
    email: 'john@example.com',
    password: '$2b$12$Nu9p/hwbBEi/bEdbAr.B4eQg/BHB2MOt0OIPv/4Dpbx8nLarJpRqO',
    role: 'user',
    isBlocked: false,
    __v: 0
  }
} { payload: { email: 'john@example.com', password: 'securepassword' } }
{
  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTczNDY4MzM0MSwiZXhwIjoxNzM5ODY3MzQxfQ.Nb5jrNL5DWQDc2yk1SGPbt28UwyUYvZQZTW-CjSu-Tg'
}

*/
