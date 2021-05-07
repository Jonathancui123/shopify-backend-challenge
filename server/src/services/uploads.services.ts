import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import multer from "multer";
import { uploadFileDirectory } from "../config/constants";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFileDirectory);
  },
  filename: function (req, file, cb) {
    const generatedUuid = uuidv4();
    cb(null, generatedUuid);
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

const receiveFile = multer({ storage, limits, fileFilter }).single(
  "auction_image"
);

export const receiveFileAsync = (req: Request, res: Response): Promise<any> => {
  return new Promise((resolve, reject) => {
    const imageUploadCallback = (err: any) => {
      if ((req as any).fileValidationError) {
        res.status(400);
        reject((req as any).fileValidationError);
      } else if (!req.file) {
        res.status(400);
        reject("Please select an image to upload");
      } else if (err instanceof multer.MulterError) {
        reject(err);
      } else if (err) {
        reject(err);
      }
      resolve("File received successfully");
    };
    receiveFile(req, res, imageUploadCallback);
  });
};

export const deleteFile = (filename: string): void => {
  fs.rmSync(path.join(uploadFileDirectory, filename));
};
