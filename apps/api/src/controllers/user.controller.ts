import { Request, Response } from "express";
import { users } from "../data/users.data";

const validateName = /^[a-zA-Z\s]+$/;
const validateEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function getUsers(_req: Request, res: Response) {
  res.json(users);
}

function getUserById(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      message: "Invalid Id format",
    });
  }

  const user = users.find((currentUser) => {
    return currentUser.id === id;
  });

  if (!user) {
    return res.status(404).json({
      message: "User Not found",
    });
  }

  res.status(200).json(user);
}

function createUser(req: Request, res: Response) {
  const name = req.body.name;
  const email = req.body.email;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({
      message: "Name is required",
    });
  }

  if (!validateName.test(name)) {
    return res.status(400).json({
      message: "Invalid name",
    });
  }

  if (!email || typeof email !== "string" || email.trim() === "") {
    return res.status(400).json({
      message: "Email is required",
    });
  }

  if (!validateEmail.test(email)) {
    return res.status(400).json({
      message: "Invalid email",
    });
  }

  const id = users.length + 1;

  const newUser = {
    id,
    name,
    email,
  };

  users.push(newUser);

  res.status(201).json(newUser);
}

function updateUser(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }

  const user = users.find((currentUser) => {
    return currentUser.id === id;
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const { name, email } = req.body;

  if (name === undefined && email === undefined) {
    return res.status(400).json({
      message: "Field and value for update must be provided in the body",
    });
  }

  if (name !== undefined) {
    if (
      typeof name === "string" &&
      name.trim() !== "" &&
      validateName.test(name)
    ) {
      user.name = name;
    } else {
      return res.status(400).json({
        message: "Invalid name",
      });
    }
  }

  if (email !== undefined) {
    if (
      typeof email === "string" &&
      email.trim() !== "" &&
      validateEmail.test(email)
    ) {
      user.email = email;
    } else {
      return res.status(400).json({
        message: "Invalid email",
      });
    }
  }

  res.status(200).json(user);
}

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
};
