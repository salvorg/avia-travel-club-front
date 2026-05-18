import { z } from 'zod';

export const FlightSearchSchema = z.object({
  fromCity: z.string().min(2, 'Укажите город вылета'),
  toCity: z.string().min(2, 'Укажите город назначения'),
  date: z.string().min(5, 'Выберите дату'),
  passengers: z.number().min(1).max(9),
});

export type FlightSearchInput = z.infer<typeof FlightSearchSchema>;

export type Flight = {
  id: string;
  airline: string;
  logo: string;
  fromCode: string;
  fromCity: string;
  toCode: string;
  toCity: string;
  timeStart: string;
  timeEnd: string;
  duration: string;
  durationMinutes: number;
  price: number;
  hasBaggage: boolean;
  isDirect: boolean;
};
