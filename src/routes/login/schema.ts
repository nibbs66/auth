import { z } from "zod";

export const formSchema = z.object({
	email: z.string().email().optional(),
});

export type FormSchema = typeof formSchema;
