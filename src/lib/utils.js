import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
import mongoose from "mongoose";
import Compress, { convertBase64ToFile } from "compress.js";

const mongoConnetion = {
  connected: 0,
};

export const connectDb = async () => {
  try {
    if (mongoConnetion.connected) {
      console.log(
        "using existing database connection",
        mongoose.connections[0].readyState
      );
      return;
    }

    await mongoose.connect(process.env.MONGODB_URL);
    mongoose.connection
      .on("error", (error) => {
        console.warn(error);
      })
      .once("open", () => {
        mongoConnetion.connected = mongoose.connections[0].readyState;
        console.log("connected to DB!");
      });
  } catch (error) {
    console.log(error);
  }
};

export const resizeImage = async (file, maxWidth, maxHeight) => {
  const compress = new Compress();
  const resizedImage = await compress.compress([file], {
    size: 0.5, // the max size in MB, defaults to 2MB
    quality: 1, // the quality of the image, max is 1,
    maxWidth: maxWidth, // the max width of the output image, defaults to 1920px
    maxHeight: maxHeight, // the max height of the output image, defaults to 1920px
    resize: true, // defaults to true, set false if you do not want to resize the image width and height
  });

  const img = resizedImage[0];
  const base64str = img.data;
  const imgExt = img.ext;
  const resizedFiile = Compress.convertBase64ToFile(base64str, imgExt);
  return resizedFiile;
};

export const convertToFile = async (base64str) => {
  const base64Data = base64str.replace(/^data:image\/\w+;base64,/, "");

  const binaryData = atob(base64Data);

  const byteArray = new Uint8Array(binaryData.length);

  for (let i = 0; i < binaryData.length; i++) {
    byteArray[i] = binaryData.charCodeAt(i);
  }

  const blob = new Blob([byteArray], { type: "image/*" });

  blob.name = "image";

  return blob;
};
