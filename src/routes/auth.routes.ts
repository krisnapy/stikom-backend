import express from "express";

import { loginMiddleware } from "@/middlewares/auth.middleware";
import AuthController from "@/controllers/auth.controller";

const router = express.Router();

router.post("/auth/login", AuthController.login);
router.get("/me", loginMiddleware, AuthController.me);
router.delete("/auth/logout", AuthController.logout);
router.get("/auth/refresh-token", AuthController.refreshToken);

export default router;
