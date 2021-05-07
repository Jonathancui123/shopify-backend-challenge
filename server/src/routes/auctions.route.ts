import express, { NextFunction, Request, Response } from "express";
import { receiveFileAsync, deleteFile } from "../services/uploads.services";
import path from "path";
import { uploadPublicS3 } from "../services/aws.service";
import { uploadFileDirectory } from "../config/constants";
import {
  createAuction,
  validateCreateAuctionInput,
} from "../services/auctions.services";

const router = express.Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await validateCreateAuctionInput(req, res);

    await receiveFileAsync(req, res);

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
});

router.get("/", (req: Request, res: Response) => {
  res.send("okay!");
});
export default router;
