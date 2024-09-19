import { getReasonPhrase, StatusCodes } from "http-status-codes";
import Services from "./../db/services/index.js";
import utils from "./../utils/index.js";

export default async (req, res, next) => {
  try {
    const { file, body: data } = req;

    let document = "";

    if (file)
      document = await utils.interactWithS3.uploadObject(
        { name: file.originalname, path: file.path },
        "document",
      );
    await Services.complaint.update(
      { document: document },
      {
        where: {
          contactNo: data.contactNo,
        },
      },
    );
    return utils.sendResponse(
      { status: StatusCodes.OK, message: getReasonPhrase(StatusCodes.OK) },
      res,
    );
  } catch (error) {
    console.log("error.........    ", error);
  }
};
