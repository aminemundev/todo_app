import dotenv from "dotenv";
dotenv.config();

import { User } from "../models/index.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { BadRequestError, UnauthorizedError } from "../utils/utils.mjs";
import config from "../config/config.mjs";

export const signup = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ message: "User created" });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new UnauthorizedError("Invalid email or password"));
  }

  const token = jwt.sign({ id: user.id }, config.jwtSecret, {
    expiresIn: "1h",
  });
  res.json({ token });
};
