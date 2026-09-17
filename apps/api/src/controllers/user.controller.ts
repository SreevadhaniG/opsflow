import { Request, Response } from "express";
import AppError from "../error/appError";
import userService from "../service/user.service";
import { CreateUserDto, UpdateUserDto } from "../types/user.dto";
import { CreateUserSchema } from "../schemas/user.schema";

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

  const data: UpdateUserDto = {
    name: req.body.name,
    email: req.body.email
  }

  if (data.name === undefined && data.email === undefined) {
    throw new AppError("Field and value for update must be provided in the body", 400);
  }

  if (data.name !== undefined) {
    if (
      typeof data.name !== "string" ||
      data.name.trim() === "" ||
      !validateName.test(data.name)
    ) {
      throw new AppError("Invalid name", 400);
    } 
  }

  if (data.email !== undefined) {
    if (
      typeof data.email !== "string" ||
      data.email.trim() === "" ||
      !validateEmail.test(data.email)
    ) {
      throw new AppError("Invalid email", 400);
    }
  }

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
