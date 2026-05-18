import { z } from 'zod';

export const TourSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(3),
  location: z.string(),
  price: z.number().positive(),
  oldPrice: z.number().positive().optional(),
  badge: z.string().optional(),
  rating: z.number().min(0).max(5),
  imageUrl: z.string().url(),
  duration: z.string(),
  nights: z.number().positive(),
});

export type Tour = z.infer<typeof TourSchema>;
