import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import multer from "multer";
import {
  AUCTION_IMAGE_FORM_KEY,
  uploadFileDirectory,
} from "../config/constants";
import fs from "fs";
import path from "path";
import logger from "../util/logger";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFileDirectory);
  },
  filename: function (req, file, cb) {
    const generatedUuid = uuidv4();
    const fileExtension =
      file.originalname.split(".")[file.originalname.split(".").length - 1];
    const newFilename = generatedUuid + "." + fileExtension;
    cb(null, newFilename);
  },
});

const limits = {
  fileSize: 2000000, // 2 MB file size limit
  files: 1, // 1 photo per auction for now
};

const fileFilter = (req: any, file: any, cb: any) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

export const receiveFile = multer({ storage, limits, fileFilter }).single(
  AUCTION_IMAGE_FORM_KEY
);

export const deleteFileFromUploadDirectory = (filename: string): void => {
  fs.unlinkSync(path.join(uploadFileDirectory, filename));
};
