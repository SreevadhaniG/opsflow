import express from "express";

import userController from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import {validate} from "../middleware/validation.middleware.js";

import { CreateUserSchema, QuerySchema, UpdateUserSchema, UserIdSchema } from "../schemas/user.schema.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/" , validate(QuerySchema, "query"), userController.getUsers);

router.get("/:id", validate(UserIdSchema, "params"), userController.getUserById);

router.post("/", validate(CreateUserSchema, "body"), userController.createUser);

router.patch("/:id", validate(UserIdSchema, "params"), validate(UpdateUserSchema, "body"), userController.updateUser);

router.delete("/:id", validate(UserIdSchema, "params"), userController.deleteUser);

export default router; 