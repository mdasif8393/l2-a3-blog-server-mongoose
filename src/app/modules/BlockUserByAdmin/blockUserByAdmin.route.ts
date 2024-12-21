import express from 'express';
import auth from '../../middlewares/auth';
import { blockUser } from './blockUserByAdmin.controller';

const router = express.Router();

export const BlockUserRoute = router.patch(
  '/:userId/block',
  auth('admin'),
  blockUser,
);
