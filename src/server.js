import app from "./app.js";
import { env } from "./config/env.js";
import prisma from "./config/database.js ";

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log("PostgresSQL connected");

    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
    });
  } catch (err) {
    console.error("Server Startup failed", err);
    process.exit(1);
  }
};

startServer();
