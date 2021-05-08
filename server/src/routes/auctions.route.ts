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
import { isAuthenticated } from "../config/passport";

const router = express.Router();

router.post(
  "/",
  isAuthenticated,
  receiveFile,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await validateCreateAuctionInput(req, res);

      console.log(req.file);
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
