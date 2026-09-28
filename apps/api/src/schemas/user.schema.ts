import { z } from "zod";

export const QuerySchema = z
  .object({
    page: z.string().regex(/^\d+$/).optional(),
    limit: z
      .string()
      .regex(/^\d+$/)
      .refine(
        (data) => Number(data) >= 1 && Number(data) <= 100,
        "Limit can't exceed 100",
      )
      .optional(),
  })
  .refine(
    (data) =>
      (data.page === undefined && data.limit === undefined) ||
      (data.page !== undefined && data.limit !== undefined),
    "Page and limit must be provided together",
  );

export const UserIdSchema = z.object({
  id: z.string().regex(/^\d+$/),
});

export const CreateUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is Required")
    .regex(/^[A-Za-z\s]+$/, "Name should only contain letters and spaces"),
  email: z.email("Invalid email"),
});

export const UpdateUserSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .regex(/^[A-Za-z\s]+$/, "Name should contain only letters and spaces")
      .optional(),
    email: z.email("Invalid email").optional(),
  })
  .refine(
    (data) => data.name !== undefined || data.email !== undefined,
    "Atleast one parameter must be given for updation",
  );

export const UserResponseSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  email: z.email(),
});

export const UserListResponseSchema = z.object({
  users: z.array(UserResponseSchema),
  meta: z.object({
      pagination: z.object({
          page: z.number().int().positive(),
          limit: z.number().int().positive(),
          total: z.number().int().nonnegative(),
          totalPages: z.number().int().nonnegative(),
        })
        .optional(),
    })
});