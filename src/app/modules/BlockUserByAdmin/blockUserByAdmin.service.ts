import { User } from '../user/user.model';

export const blockUserFromDB = async (_id: string) => {
  const result = await User.findByIdAndUpdate(
    _id,
    {
      isBlocked: true,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};
