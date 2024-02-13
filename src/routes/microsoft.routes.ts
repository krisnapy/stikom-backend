import express from "express";

import MicrosoftController from "@/controllers/microsoft-auth.controller";

const router = express.Router();

router.get("/login/microsoft", MicrosoftController.loginMicrosoft);
router.get("/microsoft/callback", MicrosoftController.microsoftCallback);

export default router;
