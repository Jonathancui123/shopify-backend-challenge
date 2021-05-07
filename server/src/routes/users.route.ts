// API keys and Passport configuration
import * as passportConfig from "../config/passport";
import express, { Request, Response} from "express";
import {createUser, updateProfile,  deleteUser} from "../services/user.services";

const router = express.Router();

/**
 * Create new user.
 * @route POST /users
 */
 router.post("/", (req: Request, res: Response) => {
    res.send("okay!");
});

/**
 * Update profile information.
 * @route PUT /users/currentUser
 */
router.put("/currentUser", (req: Request, res: Response) => {
    res.send("okay!");
});

/**
 * Get profile information.
 * @route GET /users/currentUser
 */
router.get("/currentUser", (req: Request, res: Response) => {
    res.send("okay!");
});
export default router;