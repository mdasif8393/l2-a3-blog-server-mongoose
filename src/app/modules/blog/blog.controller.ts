/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const token = req.headers?.authorization?.split(' ')[1];
  const result = await BlogServices.createBlogIntoDB(token as string, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Blog created successfully',
    data: {
      _id: result._id,
      title: result.title,
      content: result.content,
      author: result.author,
    },
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const token = req.headers?.authorization?.split(' ')[1];
  const result = await BlogServices.updateBlogIntoDB(
    req.params.id,
    req.body,
    token as string,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog updated successfully',
    data: {
      _id: result?._id,
      title: result?.title,
      content: result?.content,
      author: result?.author,
    },
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const token = req.headers?.authorization?.split(' ')[1];
  const result = await BlogServices.deleteBlogFromDB(
    req.params.id,
    token as string,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog deleted successfully',
    data: null,
  });
});

export const BlogControllers = {
  createBlog,
  updateBlog,
  deleteBlog,
};
