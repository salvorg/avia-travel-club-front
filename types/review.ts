import { z } from 'zod';

export interface Review {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  rating: number;
  text: string;
  tourName: string;
}

export const ReviewFormSchema = z.object({
  name: z.string().min(2, { message: 'Имя должно содержать минимум 2 символа' }),
  role: z.string().min(2, { message: 'Укажите вашу профессию или статус' }),
  tourName: z.string().min(3, { message: 'Укажите название тура' }),
  rating: z.number().min(1).max(5),
  text: z.string().min(10, { message: 'Отзыв должен быть не менее 10 символов' }),
});

export type ReviewFormData = z.infer<typeof ReviewFormSchema>;

export interface Review {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  rating: number;
  text: string;
  tourName: string;
}
