import express from "express";
import dotenv from 'dotenv'
import { serve } from "inngest/express";
import { inngest } from "./inngest/client.js";
import { functions as inngestFunctions } from "./inngest/function.js";
import connectDb from './utils/db.js'
import { logger } from "./utils/logger.js";
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import authRoutes from './routes/auth.routes.js'
import chatRouter from "./routes/chat.routes.js";
import moodRouter from "./routes/mood.routes.js";
import activityRouter from "./routes/activity.routes.js";

dotenv.config()

const app = express();

app.use(cors())
app.use(helmet())
app.use(morgan("dev"))

app.use(express.json());

app.use(
  "/api/inngest",
  serve({ client: inngest, functions: inngestFunctions })
);

app.use('/auth',authRoutes)
app.use("/chat", chatRouter);
app.use("/api/mood", moodRouter);
app.use("/api/activity", activityRouter);

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
