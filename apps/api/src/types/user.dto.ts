import {z} from "zod";
import { CreateUserSchema, UpdateUserSchema, UserListResponseSchema, UserResponseSchema } from "../schemas/user.schema.js";

export type CreateUserDto = z.infer<typeof CreateUserSchema>;

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;

export type UserResponseDto = z.infer<typeof UserResponseSchema>;

export type UserListResponseDto = z.infer<typeof UserListResponseSchema>;