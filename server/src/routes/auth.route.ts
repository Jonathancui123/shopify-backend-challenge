import express, { Request, Response} from "express";
import {login, logout} from "../services/auth.services";

const router = express.Router();


/**
 * Sign out
 * @route GET /auth/logout
 */

 router.get("/logout", (req: Request, res: Response) => {
    res.send("okay!");
});

/**
 * Sign in using email and password.
 * @route POST /auth/login
 */

router.post("/login", (req: Request, res: Response) => {
    res.send("okay!");
});
export default router;