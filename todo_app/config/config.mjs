import "dotenv/config";

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  console.warn(
    "Warning: JWT_SECRET is not set. Requests requiring JWT will fail or be insecure.",
  );
}

const config = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || "development",
  jwtSecret: jwtSecret || "change_me_dev",
  db: {
    host: process.env.MYSQL_HOST || "localhost",
    port: Number(process.env.MYSQL_PORT) || 3306,
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "todos_db",
    dialect: "mysql",
  },
};

export default config;
