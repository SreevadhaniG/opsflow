import { z } from "zod";

export const CreateUserSchema = z.object({
    name: z.string().trim().min(1, "Name is Required").regex(/^[A-Za-z\s]+$/, "Name should only contain letters and spaces"),
    email: z.email("Invalid email")
});

export const UpdateUserSchema = z.object({
    name : z.string().trim().min(1, "Name is required").regex(/^[A-Za-z\s]+$/,"Name should contain only letters and spaces").optional(),
    email: z.email("Invalid email").optional()
}).refine(
    (data) => data.name !== undefined || data.email !== undefined,
    "Atleast one parameter must be given for updation"
);