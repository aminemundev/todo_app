import Joi from "joi";

export const createTodoSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  completed: Joi.boolean().optional(),
});

export const updateTodoSchema = Joi.object({
  title: Joi.string().min(3).max(100).optional(),
  completed: Joi.boolean().optional(),
});
