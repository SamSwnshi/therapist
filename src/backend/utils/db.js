import mongoose from "mongoose";
import { logger } from "./logger.js";

const config = async () => {
  try {
    await mongoose.connect(process.env.MONOGO_URL);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("MongoDb connection Error:", error);
    process.exit(1)
  }
};

export default config;
