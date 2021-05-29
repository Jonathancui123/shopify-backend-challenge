import Jimp from "jimp";

import { uploadFileDirectory, pathToWatermark } from "../config/constants";
import path from "path";

export const createWatermarkedFile = async (
  imageFilePath: string,
  imageFilename: string
): Promise<[string, string]> => {
  const watermarkDestination = path.join(
    uploadFileDirectory,
    "watermarked-" + imageFilename
  );

  const [image, logo] = await Promise.all([
    Jimp.read(imageFilePath),
    Jimp.read(pathToWatermark),
  ]);

  const logoScaleFactor = Math.min(
    image.bitmap.height / logo.bitmap.height,
    image.bitmap.width / logo.bitmap.width
  );

  logo.resize(
    logo.bitmap.width * logoScaleFactor,
    logo.bitmap.height * logoScaleFactor
  );

  const X = (image.bitmap.width - logo.bitmap.width) / 2;
  const Y = (image.bitmap.height - logo.bitmap.height) / 2;

  const result = await image
    .composite(logo, X, Y)
    .writeAsync(watermarkDestination);

  return [watermarkDestination, "watermarked-" + imageFilename];
};
