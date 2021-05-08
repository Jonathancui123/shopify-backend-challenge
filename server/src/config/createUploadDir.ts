import { uploadFileDirectory } from "./constants";
import fs, { PathLike } from "fs";

export const createUploadDir = (cb: Function, mask = 0o777) => {
  fs.mkdir(
    uploadFileDirectory,
    { recursive: true, mode: mask },
    function (err) {
      if (err) {
        if (err.code == "EEXIST") cb(null);
        // Ignore the error if the folder already exists
        else cb(err); // Something else went wrong
      } else cb(null); // Successfully created folder
    }
  );
};
