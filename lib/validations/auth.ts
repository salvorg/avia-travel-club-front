// components/lib/validations/auth.ts

import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email обязателен для заполнения').email('Неверный формат почты'),

  password: z
    .string()
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .max(100, 'Слишком длинный пароль'),

  rememberMe: z.boolean(),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Укажите имя и фамилию').max(100, 'Слишком длинное имя'),

    email: z.string().min(1, 'Email обязателен для заполнения').email('Неверный формат почты'),

    password: z
      .string()
      .min(8, 'Пароль должен содержать минимум 8 символов')
      .max(100, 'Слишком длинный пароль'),

    confirmPassword: z.string().min(8, 'Подтвердите пароль'),

    terms: z.boolean().refine((value) => value === true, {
      message: 'Необходимо принять условия использования',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Пароли не совпадают',
  });

export type RegisterInput = z.infer<typeof registerSchema>;
