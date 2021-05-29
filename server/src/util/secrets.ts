import logger from "./logger";
import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
  logger.debug("Using .env file to supply config environment variables");
  dotenv.config({ path: ".env" });
}
export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production"; // Anything else is treated as 'dev'

export const SESSION_SECRET = process.env["SESSION_SECRET"];
export const MONGODB_URI = prod
  ? process.env["MONGODB_URI"]
  : process.env["MONGODB_URI_LOCAL"];

export const AWS_ACCESS_KEY_ID = process.env["AWS_ACCESS_KEY_ID"];
export const AWS_SECRET_KEY = process.env["AWS_SECRET_KEY"];
export const PUBLIC_S3_BUCKET_NAME = process.env["PUBLIC_S3_BUCKET_NAME"];
export const PRIVATE_S3_BUCKET_NAME = process.env["PRIVATE_S3_BUCKET_NAME"];

if (!SESSION_SECRET) {
  logger.error("No client secret. Set SESSION_SECRET environment variable.");
  process.exit(1);
}

if (!MONGODB_URI) {
  if (prod) {
    logger.error(
      "No mongo connection string. Set MONGODB_URI environment variable."
    );
  } else {
    logger.error(
      "No mongo connection string. Set MONGODB_URI_LOCAL environment variable."
    );
  }
  process.exit(1);
}
