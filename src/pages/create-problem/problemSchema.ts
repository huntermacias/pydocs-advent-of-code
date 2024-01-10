// schemas/problemSchema.ts
import * as z from 'zod';

export const problemSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    difficulty: z.string().min(1, "Difficulty is required"),
    hints: z.array(z.string().min(1, "Hint is required")),
    topics: z.array(z.string().min(1, "Topic is required"))
});
