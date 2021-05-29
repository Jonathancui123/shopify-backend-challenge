// API keys and Passport configuration
import { isAuthenticated } from "../config/passport";
import express, { NextFunction, Request, Response } from "express";
import { createUser, updateProfile, getUser } from "../services/user.services";
import { getMyAuctions } from "../services/auctions.service";
import { getPresignedUrl } from "../services/aws.service";
import logger from "../util/logger";

const router = express.Router();

/**
 * Create new user.
 * @route POST /users
 */
router.post("/", (req: Request, res: Response, next: NextFunction) => {
  createUser(req, res, next);
});

/**
 * Update profile information.
 * @route PUT /users/currentUser
 */
router.put(
  "/currentUser",
  isAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    updateProfile(req, res, next);
  }
);

/**
 * Get user information.
 * @route GET /users/currentUser
 */
router.get(
  "/currentUser",
  (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
      res.send(req.user as any);
    } else {
      res.status(400).send("not authenticated");
    }
  }
);

/**
 * Get auctions for the current user.
 * @route GET /users/currentUser/auctions
 */
router.get(
  "/currentUser/auctions",
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
      const auctions = await getMyAuctions((req.user as any).id);
      logger.info(auctions);
      await Promise.all(
        auctions.map(async (auction) => {
          auction.privateImageSrc = await getPresignedUrl(auction.baseFileName);
          logger.info(auction.privateImageSrc);
        })
      );
      res.send(auctions);
    } else {
      res.status(400).send("not authenticated");
    }
  }
);

export default router;
