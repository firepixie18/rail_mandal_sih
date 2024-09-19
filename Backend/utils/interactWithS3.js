import fs from "fs";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { generateRandomString } from "../common/hashing.js";
import dotenv from "dotenv";
dotenv.config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

const uploadObject = async (file, type, next) => {
  try {
    const env = process.env.NODE_ENV;
    const { name: filename, path } = file;

    const fileExtension = filename
      .substring(filename.lastIndexOf(".") + 1, filename.length)
      .toLowerCase();

    let filePrefix = ``;
    let bucketKey = env === `production` ? `prod/` : `dev/`;

    type = type.toLowerCase();

    bucketKey += type + "/";

    switch (fileExtension) {
      case "jpg":
      case "png":
      case "jpeg":
      case "gif":
      case "bmp":
        filePrefix = "IMG";
        break;
      case "txt":
      case "doc":
      case "docx":
      case "xlt":
      case "xls":
      case "ppt":
      case "pptx":
      case "csv":
      case "json":
      case "pdf":
        filePrefix = "PDF";
        break;
      case "mp4":
      default:
        filePrefix = "UNKNOWN";
    }

    const id = generateRandomString(4);
    let url = "";

    const original =
      filePrefix +
      "_" +
      filename.replace(/\.[^/.]+$/, "").replace(/ /g, "_") +
      "_" +
      id +
      "." +
      fileExtension;

    const fileKey = bucketKey + original; // path to be uploaded
    const fileData = fs.readFileSync(path);
    console.log("uploading file to S3");
    const result = await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: fileKey,
        ContentType: fileExtension,
        Body: fileData,
      }),
    );

    if (result) fs.unlinkSync(path);

    console.log("uploaded file to S3");

    url = `${process.env.AWS_S3_URL}/${fileKey}`;
    return url;
  } catch (error) {
    console.error(err.stack);
  }
};

export default {
  uploadObject,
};
