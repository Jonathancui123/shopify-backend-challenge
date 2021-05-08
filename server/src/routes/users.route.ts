// API keys and Passport configuration
import { isAuthenticated } from "../config/passport";
import express, { NextFunction, Request, Response } from "express";
import { createUser, updateProfile, getUser } from "../services/user.services";

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
 * Get profile information.
 * @route GET /users/currentUser
 */
router.get(
  "/currentUser",
  isAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    getUser(req, res, next);
  }
);

export default router;
