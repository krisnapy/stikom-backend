import express from "express";

import ProgramStudyController from "@/controllers/program-study.controller";
import { loginMiddleware } from "@/middlewares/auth.middleware";

const router = express.Router();

router.get(
  "/admin/program-studies",
  loginMiddleware,
  ProgramStudyController.getProgramStudies
);
router.get(
  "/admin/program-studies/:id",
  loginMiddleware,
  ProgramStudyController.getProgramStudy
);
router.put(
  "/admin/program-studies/:id",
  loginMiddleware,
  ProgramStudyController.updateProgramStudy
);
router.delete(
  "/admin/program-studies/:id",
  loginMiddleware,
  ProgramStudyController.deleteProgramStudy
);
router.post(
  "/admin/program-studies",
  loginMiddleware,
  ProgramStudyController.createNewProgramStudy
);

export default router;
