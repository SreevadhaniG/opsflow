import { Request, Response } from "express";
import { UserListResponseDto, UserResponseDto } from "../types/user.dto.js";
import {
  UserListResponseSchema,
  UserResponseSchema,
} from "../schemas/user.schema.js";

import AppError from "../error/appError.js";
import userService from "../service/user.service.js";
import User from "../types/user.types.js";

function getUsers(req: Request, res: Response) {
  const page = req.query.page !== undefined ? Number(req.query.page) : undefined;
  const limit = req.query.limit !== undefined ? Number(req.query.limit) : undefined;

  const result = userService.getUsers(page, limit);

  const response : UserListResponseDto = {
    users: result.users.map((user : User) => ({
      id: user.id,
      name: user.name,
      email: user.email
    })),
    meta: result.meta
  }

  UserListResponseSchema.parse(response);

  res.status(200).json(response);
}

async function getUserById(req: Request, res: Response) {
  const id = Number(req.params.id);

  const user = await userService.getUserById(id);

  res.status(200).json(user);
}

async function createUser(req: Request, res: Response) {
  const newUser = await userService.createUser(req.body);

  res.status(201).json(newUser);
}

async function updateUser(req: Request, res: Response) {
  const id = Number(req.params.id);

  const updatedUser = await userService.updateUser(id, req.body);

  if (updatedUser === null) {
    throw new AppError("User not found", 404);
  }

  res.status(200).json(updatedUser);
}

async function deleteUser(req: Request, res: Response) {
  const id = Number(req.params.id);

  const deleted = await userService.deleteUser(id);

  if (!deleted) {
    throw new AppError("User not found", 404);
  }

  res.status(204).send();
}

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
