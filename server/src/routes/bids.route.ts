// API keys and Passport configuration
import express, { NextFunction, Request, Response } from "express";
import { createBid } from "../services/bids.service";

const router = express.Router();

/**
 * Create new bid.
 * @route POST /bids
 */
router.post("/", (req: Request, res: Response, next: NextFunction) => {
  createBid(req, res, next);
});

export default router;
