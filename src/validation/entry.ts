import { z } from "zod";

export const createNewEntry = z.object({
  date: z.date(),
  name: z.string(),
  food: z.object({
    name: z.string(),
    carbs: z.number().optional(),
    fat: z.number().optional(),
    protein: z.number().optional(),
    calories: z.number().optional(),
  }),
});

export type CreateNewEntryType = z.infer<typeof createNewEntry>;
