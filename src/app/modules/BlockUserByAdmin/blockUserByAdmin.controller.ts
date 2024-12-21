/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { blockUserFromDB } from './blockUserByAdmin.service';

export const blockUser = catchAsync(async (req, res) => {
  const result = await blockUserFromDB(req.params.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User blocked successfully',
    data: null,
  });
});
