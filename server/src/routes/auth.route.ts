import express, { NextFunction, Request, Response } from "express";
import { login, logout } from "../services/auth.service";
import { isAuthenticated } from "../config/passport";

const router = express.Router();

/**
 * Sign out
 * @route GET /auth/logout
 */
router.get(
  "/logout",
  isAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    logout(req, res);
  }
);

/**
 * Sign in using email and password.
 * @route POST /auth/login
 */
router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  login(req, res, next);
});
export default router;
