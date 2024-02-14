import AdminController from "@/controllers/admin.controller";
import { loginMiddleware } from "@/middlewares/auth.middleware";
import express from "express";

const router = express.Router();

router.get("/admin/admins", loginMiddleware, AdminController.getAdmins);
router.get("/admin/admins/:id", loginMiddleware, AdminController.getAdmin);
router.put("/admin/admins/:id", loginMiddleware, AdminController.updateAdmin);
router.delete(
  "/admin/admins/:id",
  loginMiddleware,
  AdminController.deleteAdmin
);
router.post("/admin/admins", loginMiddleware, AdminController.createNewAdmin);

export default router;
