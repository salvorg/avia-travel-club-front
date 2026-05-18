import { z } from 'zod';

export const EventSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(3),
  description: z.string().min(10),
  location: z.string(),
  date: z.string().datetime(), // ISO дата для парсинга на клиенте
  price: z.number().nonnegative(), // 0 если вход свободный
  imageUrl: z.string().url(),
  category: z.string().optional(),
  slotsLeft: z.number().optional(),
});

export type UpcomingEvent = z.infer<typeof EventSchema>;
