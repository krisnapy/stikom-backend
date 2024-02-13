import express from "express";

import UserController from "@/controllers/user.controller";
import { loginMiddleware } from "@/middlewares/auth.middleware";

const router = express.Router();

router.get("/admin/users", loginMiddleware, UserController.getUsers);
router.get("/admin/users/:id", loginMiddleware, UserController.getUser);
router.put("/admin/users/:id", loginMiddleware, UserController.updateUser);
router.delete("/admin/users", loginMiddleware, UserController.deleteUser);
router.post("/admin/users", loginMiddleware, UserController.createNewUser);

export default router;
