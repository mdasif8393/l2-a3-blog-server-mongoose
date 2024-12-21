import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BlogControllers } from './blog.controller';
import { BlogValidations } from './blog.validation';

const router = express.Router();

export const BlogDeleteAdminRoute = router.delete(
  '/:id',
  auth('admin'),
  BlogControllers.deleteBlogByAdmin,
);

router.post(
  '/',
  auth('user'),
  validateRequest(BlogValidations.createBlogValidationSchema),
  BlogControllers.createBlog,
);

router.patch(
  '/:id',
  auth('user'),
  validateRequest(BlogValidations.updateBlogValidationSchema),
  BlogControllers.updateBlog,
);

router.delete('/:id', auth('user'), BlogControllers.deleteBlog);

router.get('/', BlogControllers.getAllBlogs);

export const BlogRoutes = router;
