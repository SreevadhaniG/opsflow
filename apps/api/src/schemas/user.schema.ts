import { z } from "zod";

export const CreateUserSchema = z.object({
    name: z.string().trim().min(1).regex(/^[A-Za-z\s]+$/),
    email: z.email()
});