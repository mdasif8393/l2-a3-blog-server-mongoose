/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { deleteBlogFromDbByAdmin } from './deleteBlogByAdmin.service';

export const deleteBlogByAdmin = catchAsync(async (req, res) => {
  const result = await deleteBlogFromDbByAdmin(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog deleted successfully',
    data: null,
  });
});
