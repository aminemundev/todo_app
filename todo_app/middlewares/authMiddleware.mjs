import jwt from "jsonwebtoken";
import config from "../config/config.mjs";
import { UnauthorizedError } from "../utils/utils.mjs";

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Please provide a valid token"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded; // { id: ... }
    next();
  } catch (err) {
    return next(new UnauthorizedError("Invalid or expired token"));
  }
};
