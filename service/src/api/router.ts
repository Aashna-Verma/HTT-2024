import express, { Request, Response } from "express";
import { AccountRouter, ScheduledEventRouter, TimetableRouter, DiscordRouter } from "./routes";

const router = express.Router();

const getAPIRoot = async (_: Request, response: Response) => {
  response.json({
    message: "API - 👋",
  });
};

router.get("/", getAPIRoot);
router.use("/", AccountRouter);
router.use("/scheduledEvents", ScheduledEventRouter);
router.use("/timetables", TimetableRouter);
router.use("/discord", DiscordRouter);

export default router;
