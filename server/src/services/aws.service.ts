import AWS from "aws-sdk";
import { Request, Response, NextFunction } from "express";
import fs, { PathLike } from "fs";
import {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_KEY,
  PUBLIC_S3_BUCKET_NAME,
  PRIVATE_S3_BUCKET_NAME,
} from "../util/secrets";

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_KEY,
});

export const uploadPrivateS3 = (
  filepath: PathLike,
  filename: string
): Promise<string> => {
  const fileContent = fs.readFileSync(filepath);

  const uploadParams = {
    Bucket: PRIVATE_S3_BUCKET_NAME,
    Key: filename,
    Body: fileContent,
  };

  return new Promise((resolve, reject) => {
    s3.upload(
      uploadParams,
      (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
        if (err) {
          reject(err);
        } else {
          const s3fileLocation = data.Location;
          resolve(s3fileLocation);
        }
      }
    );
  });
};

export const uploadPublicS3 = (
  filepath: PathLike,
  filename: string
): Promise<string> => {
  const fileContent = fs.readFileSync(filepath);

  const uploadParams = {
    Bucket: PUBLIC_S3_BUCKET_NAME,
    Key: filename,
    Body: fileContent,
    ACL: "public-read",
  };

  return new Promise((resolve, reject) => {
    s3.upload(
      uploadParams,
      (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
        if (err) {
          reject(err);
        } else {
          const s3fileLocation = data.Location;
          resolve(s3fileLocation);
        }
      }
    );
  });
};
