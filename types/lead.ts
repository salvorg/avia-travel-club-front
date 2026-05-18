import { z } from 'zod';

export const LeadFormSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  phone: z.string().min(9, 'Введите корректный номер телефона'),
  email: z.string().email('Некорректный формат почты').optional().or(z.literal('')),
  comment: z.string().max(500, 'Комментарий слишком длинный').optional(),
});

export type LeadFormData = z.infer<typeof LeadFormSchema>;
