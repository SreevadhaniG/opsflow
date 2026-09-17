import express from "express";

import userController from "../controllers/user.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = express.Router();

router.use(authMiddleware);

router.get("/" , userController.getUsers);

router.get("/:id", userController.getUserById);

router.post("/", userController.createUser);

router.patch("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

export default router; 