import { Request, Response } from "express";
import AppError from "../error/appError";
import userService from "../service/user.service";
import { CreateUserSchema, UpdateUserSchema } from "../schemas/user.schema";

const validateName = /^[a-zA-Z\s]+$/;
const validateEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function getUsers(_req: Request, res: Response) {
  res.json(userService.getUsers());
}

function getUserById(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    throw new AppError("Invalid ID", 400);
  }

  const user = userService.getUserById(id);

  if (!user) {
    throw new AppError("User Not Found", 404);
  }

  res.status(200).json(user);
}

function createUser(req: Request, res: Response) {
  const data = CreateUserSchema.parse(req.body);

  const newUser = userService.createUser(data);

  res.status(201).json(newUser);
}

function updateUser(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    throw new AppError("Invalid ID format", 400);
  }

  const data = UpdateUserSchema.parse(req.body);

  const updatedUser = userService.updateUser(id, data);

  if(updatedUser === null){
    throw new AppError("User not found", 404);
  }

  res.status(200).json(updatedUser);
}

function deleteUser(req: Request, res: Response){
  const id = Number(req.params.id);

  if(Number.isNaN(id)){
    throw new AppError("Invalid ID format", 400);
  }

  const deleted = userService.deleteUser(id);

  if(!deleted){
    throw new AppError("User not found", 404);
  }

  res.status(204).send();
}

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
