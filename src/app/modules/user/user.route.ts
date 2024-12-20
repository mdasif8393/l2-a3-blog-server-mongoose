import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import { UserValidations } from './user.validation';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidations.createUserValidationSchema),
  UserControllers.createUser,
);

router.post(
  '/login',
  validateRequest(UserValidations.loginValidationSchema),
  UserControllers.loginUser,
);

export const UserRoutes = router;
