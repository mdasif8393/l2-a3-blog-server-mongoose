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

export const UserValidations = {
  createUserValidationSchema,
};
