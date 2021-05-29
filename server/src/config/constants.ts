import path from "path";
export const uploadFileDirectory = path.join(__dirname, "../", "/tmp/uploads");
export const AUCTION_IMAGE_FORM_KEY = "auction_image";
export const pathToWatermark = path.join(
  __dirname,
  "../",
  "/public/sample.png"
);

const PROD = {
  frontendAddress: process.env.FRONTEND_ADDRESS,
  backendAddress: process.env.BACKEND_ADDRESS,
};
const DEV = {
  frontendAddress: "http://localhost:4000",
  backendAddress: "http://localhost:3000",
};
export const CONFIG = process.env.NODE_ENV === "production" ? PROD : DEV;
