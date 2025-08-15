import express from "express";
import { serve } from "inngest/express";
import { inngest } from "./inngest/index.js";
import { functions as inngestFunctions } from "./inngest/function.js";
import connectDb from './utils/db.js'
import dotenv from 'dotenv'

import { logger } from "./utils/logger.js";
dotenv.config()
const PORT = 3000;
const app = express();

app.use(express.json());

app.use(
  "/api/inngest",
  serve({ client: inngest, functions: inngestFunctions })
);

const startServer = async () => {
  try {
    await connectDb()
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
      logger.info(
        `Inngest endpoint available at http://localhost:${PORT}/api/inngest`
      );
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

// app.listen(PORT,()=>{
//     console.log('Server Started')
// })
