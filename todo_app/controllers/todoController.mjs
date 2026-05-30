import { Todo } from "../models/index.mjs";
import { NotFoundError } from "../utils/utils.mjs";
import { Op } from "sequelize";

// CREATE
export const createTodo = async (req, res, next) => {
  try {
    const todo = await Todo.create({
      title: req.body.title,
      completed: req.body.completed ?? false,
      userId: req.user.id, // <-- from JWT
    });

    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
};

// GET ALL (with filters/pagination + user-specific)
export const getAllTodos = async (req, res, next) => {
  try {
    const { completed, search, page = 1, limit = 10 } = req.query;

    const where = { userId: req.user.id }; // only this user's todos

    if (completed !== undefined) {
      where.completed = completed === "true";
    }

    if (search) {
      where.title = { [Op.like]: `%${search}%` };
    }

    const offset = (Number(page) - 1) * Number(limit);

    const { rows, count } = await Todo.findAndCountAll({
      where,
      limit: Number(limit),
      offset,
      order: [["createdAt", "DESC"]],
    });

    res.json({
      data: rows,
      total: count,
      page: Number(page),
      pages: Math.ceil(count / Number(limit)),
    });
  } catch (err) {
    next(err);
  }
};

// GET BY ID (ensure ownership)
export const getTodoById = async (req, res, next) => {
  try {
    const todo = await Todo.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!todo) {
      throw new NotFoundError("Todo not found");
    }

    res.json(todo);
  } catch (err) {
    next(err);
  }
};

// UPDATE (ensure ownership)
export const updateTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!todo) {
      throw new NotFoundError("Todo not found");
    }

    await todo.update(req.body);

    res.json(todo);
  } catch (err) {
    next(err);
  }
};

// DELETE (ensure ownership)
export const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!todo) {
      throw new NotFoundError("Todo not found");
    }

    await todo.destroy();

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
