import { Request, Response } from 'express';
import express from "express";
import {
  checkRequiredPermissions,
  validateAccessToken,
} from "../middleware/auth0.middleware";
import { AdminMessagesPermissions } from "./messages.permissions";
import {
  getAdminMessage,
  getProtectedMessage,
  getPublicMessage,
  PostProtectedMessage
} from "./messages.service";

export const messagesRouter = express.Router();

messagesRouter.get("/public", async(req, res) => {
  const message = await getPublicMessage(req,res);

  res.status(200).json(message);
});

messagesRouter.get("/protected", validateAccessToken, async (req,res) => {
  const message = await getProtectedMessage();
  console.log('Message in Router:', message);
  res.status(200).json(message);
});

messagesRouter.post("/protected", validateAccessToken, async (req: Request, res: Response) => {
  console.log('Message in received in Router:', req);
  const message = await PostProtectedMessage(req, res);
  console.log('Message in Router:', message);
  res.status(200).json(message);
});

messagesRouter.get(
  "/admin",
  validateAccessToken,
  checkRequiredPermissions([AdminMessagesPermissions.Read]),
  (req, res) => {
    const message = getAdminMessage();

    res.status(200).json(message);
  }
);
