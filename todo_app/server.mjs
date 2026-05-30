import app from "./app.mjs";
import config from "./config/config.mjs";
import sequelize, { connectDB } from "./database/sequelize.mjs";

// import models so Sequelize knows about them (register associations)
import "./models/index.mjs";

const startServer = async () => {
  try {
    await connectDB();

    await sequelize.sync();
    console.log("Database synced");

    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
  }
};

startServer();
