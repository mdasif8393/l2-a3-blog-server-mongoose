import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is requires',
    }),
    email: z
      .string({
        required_error: 'email is requires',
      })
      .email(),
    password: z.string({
      required_error: 'password is requires',
    }),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'email is required.' }).email(),
    password: z.string({ required_error: 'password is required' }),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
  loginValidationSchema,
};
