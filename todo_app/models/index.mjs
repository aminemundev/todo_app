import { User } from "./_User_temp.mjs";
import Todo from "./Todo.mjs";

// Associations
User.hasMany(Todo, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Todo.belongsTo(User, {
  foreignKey: "userId",
});

export { User, Todo };
