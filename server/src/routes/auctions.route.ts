import express, { NextFunction, Request, Response } from "express";
import { deleteFile, receiveFile } from "../services/uploads.service";
import path from "path";
import { uploadPublicS3 } from "../services/aws.service";
import { uploadFileDirectory } from "../config/constants";
import {
  createAuction,
  getAllAuctions,
  validateCreateAuctionInput,
} from "../services/auctions.service";
import logger from "../util/logger";
import passport from "passport";
const router = express.Router();

router.post(
  "/",
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

router.get("/", async (req: Request, res: Response) => {
  const allAuctions = await getAllAuctions();
  res.send(allAuctions);
});
export default router;
