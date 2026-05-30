import express from "express";
import todoRoutes from "./routes/todoRoutes.mjs";
import authRoutes from "./routes/authRoutes.mjs";
import errorHandler from "./middlewares/errorMiddleware.mjs";
const app = express();

app.use(express.json());

app.use("/todos", todoRoutes);
app.use("/auth", authRoutes);
app.use(errorHandler);
export default app;
