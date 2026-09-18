import {z} from "zod";
import { CreateUserSchema, UpdateUserSchema } from "../schemas/user.schema";

export type CreateUserDto = z.infer<typeof CreateUserSchema>;

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;