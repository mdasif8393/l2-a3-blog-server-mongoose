import express from 'express';
import auth from '../../middlewares/auth';
import { deleteBlogByAdmin } from './deleteBlogByAdmin.controller';

const router = express.Router();

export const BlogDeleteAdminRoute = router.delete(
  '/:id',
  auth('admin'),
  deleteBlogByAdmin,
);
