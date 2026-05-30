import express from "express";
import { signup, login } from "../controllers/authController.mjs";

const router = express.Router();

// Define your auth routes
router.post("/signup", signup);
router.post("/login", login);

export default router;
