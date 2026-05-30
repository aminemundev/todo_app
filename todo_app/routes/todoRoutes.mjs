import express from "express";
import { validate } from "../middlewares/validate.mjs"; // Import middleware
import {
  createTodoSchema,
  updateTodoSchema,
} from "../validations/todoValidation.mjs"; // Import schemas
import {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController.mjs";
import { protect } from "../middlewares/authMiddleware.mjs";

const router = express.Router();

// Anyone can view
router.get("/", protect, getAllTodos);
router.get("/:id", protect, getTodoById);

// Only logged in users can modify
router.post("/", protect, validate(createTodoSchema), createTodo);
router.put("/:id", protect, validate(updateTodoSchema), updateTodo);
router.delete("/:id", protect, deleteTodo);

export default router;
