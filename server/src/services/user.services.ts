import { User, UserDocument } from "../models/User";
import { Request, Response, NextFunction } from "express";
import { WriteError } from "mongodb";
import { check, sanitize, validationResult } from "express-validator";
import { CallbackError, NativeError } from "mongoose";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  await check("email", "Email is not valid").isEmail().run(req);
  await check("password", "Password must be at least 4 characters long")
    .isLength({ min: 4 })
    .run(req);
  await check("confirmPassword", "Passwords do not match")
    .equals(req.body.password)
    .run(req);
  await sanitize("email").normalizeEmail({ gmail_remove_dots: false }).run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Error signing up
    return res.redirect("/signup");
  }

  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  User.findOne(
    { email: req.body.email },
    (err: NativeError, existingUser: UserDocument) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        // Account already exists
        return res.redirect("/signup");
      }
      user.save((err) => {
        if (err) {
          return next(err);
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          res.redirect("/");
        });
      });
    }
  );
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  await check("email", "Please enter a valid email address.")
    .isEmail()
    .run(req);
  await sanitize("email").normalizeEmail({ gmail_remove_dots: false }).run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Error with validation
    return res.redirect("/account");
  }

  const user = req.user as UserDocument;
  User.findById(user.id, (err: NativeError, user: UserDocument) => {
    if (err) {
      return next(err);
    }
    user.email = req.body.email || "";
    user.profile.name = req.body.name || "";
    user.save((err: WriteError & CallbackError) => {
      if (err) {
        if (err.code === 11000) {
          return res.redirect("/account");
        }
        return next(err);
      }
      res.redirect("/account");
    });
  });
};

export const getUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const user = req.user as UserDocument;
  User.findOne({ _id: user.id }, (err: Error) => {
    if (err) {
      return next(err);
    }
  });
};
