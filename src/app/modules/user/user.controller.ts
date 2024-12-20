import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDb(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User is created successfully',
    data: {
      _id: result?._id,
      name: result?.name,
      email: result?.email,
    },
  });
});

export const UserControllers = {
  createUser,
};
