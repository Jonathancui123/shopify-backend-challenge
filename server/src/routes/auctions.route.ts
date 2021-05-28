import express, { NextFunction, Request, Response } from "express";
import { deleteFile, receiveFile } from "../services/uploads.service";
import path from "path";
import { uploadPublicS3 } from "../services/aws.service";
import { uploadFileDirectory } from "../config/constants";
import {
  createAuction,
  validateCreateAuctionInput,
} from "../services/auctions.service";
import logger from "../util/logger";
import passport from "passport";
const router = express.Router();

router.post(
  "/",
  function (req, res, next) {
    logger.info("SESSION ID:");
    logger.info(req.sessionID);
    logger.info("SESSION:");
    logger.info(req.session);
    // passport.authenticate("local", function (err, user, info) {
    //   logger.info(info);
    //   if (err) {
    //     return next(err);
    //   }
    //   if (!user) {
    //     logger.info("NO USER FOUND");
    //     return res.redirect("/login");
    //   }
    //   req.logIn(user, function (err) {
    //     logger.info("USER:");
    //     logger.info(user);
    //     if (err) {
    //       logger.info("LOGIN UNSUCCESSFUL");
    //       return next(err);
    //     }
    //     logger.info("LOGIN UNSUCCESSFUL");
    //     return res.redirect("/users/" + user.username);
    //   });
    // })(req, res, next);
    next();
  },
  receiveFile,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await validateCreateAuctionInput(req, res);

      console.log(req.file.filename);
      // await receiveFileAsync(req, res);

      const imageFilename = req.file.filename;
      const imageFilePath = path.join(uploadFileDirectory, imageFilename);

      // TODO: Implement retry for failed upload
      const s3FileLocation = await uploadPublicS3(imageFilePath, imageFilename);

      // Assume successful image upload to s3, delete from local server
      deleteFile(imageFilename);

      const createdAuction = await createAuction(req, res, s3FileLocation);

      res.send(createdAuction);
    } catch (err) {
      next(err);
    }
  }
);

router.get("/current", (req: Request, res: Response) => {
  // TODO: Provide a list of current auctions
});
export default router;
