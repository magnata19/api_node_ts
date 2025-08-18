import z from "zod";

export const StoreSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().min(2).max(100).optional(),
  location: z.string().min(2).max(255).optional()
})

export type StoreDto = z.infer<typeof StoreSchema>;