export interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
}

export type TLoginUser = {
  email: string;
  password: string;
};
