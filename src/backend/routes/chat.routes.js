import express from "express";
import {
  createChatSession,
  getChatSession,
  sendMessage,
  getChatHistory,
} from "../controllers/chat.js";
import { auth } from "../middleware/auth.middleware.js";

const router = express.Router();

// Apply auth middleware to all routes
router.use(auth);

// Create a new chat session
router.post("/sessions", createChatSession);

// Get a specific chat session
router.get("/sessions/:sessionId", getChatSession);

// Send a message in a chat session
router.post("/sessions/:sessionId/messages", sendMessage);

// Get chat history for a session
router.get("/sessions/:sessionId/history", getChatHistory);

export default router;
