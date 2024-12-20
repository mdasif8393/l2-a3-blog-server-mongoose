import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { IUser } from './user.interface';
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

export const UserServices = {
  createUserIntoDb,
};
