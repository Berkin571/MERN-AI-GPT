import { Router } from "express";
import userRoutes from "./user-routes.js";
import chatbotRoutes from "./chatbot-routes.js";

const router = Router();

router.use("/user", userRoutes);
router.use("/chat", chatbotRoutes);

export default router;
