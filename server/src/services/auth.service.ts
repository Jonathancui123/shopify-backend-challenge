import { Request, Response, NextFunction } from "express";
import { IVerifyOptions } from "passport-local";
import { check, sanitize, validationResult } from "express-validator";
import { UserDocument } from "../models/User";
import passport from "passport";
import logger from "../util/logger";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  await check("email", "Email is not valid").isEmail().run(req);
  await check("password", "Password cannot be blank")
    .isLength({ min: 1 })
    .run(req);
  await sanitize("email").normalizeEmail({ gmail_remove_dots: false }).run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).send("Bad request");
  }

  passport.authenticate(
    "local",
    (err: Error, user: UserDocument, info: IVerifyOptions) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        // Errors exist
        return res.status(403).send("Login not found");
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        // Successful login
        logger.info(user);
        res.status(200).send(req.session.returnTo);
      });
    }
  )(req, res, next);
};

/**
 * Log out.
 * @route GET /logout
 */
export const logout = (req: Request, res: Response): void => {
  req.logout();
  res.redirect("/");
};
