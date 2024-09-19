import Joi from "joi";
import utils from "./../utils/index.js";
import Services from "./../db/services/index.js";
import responseMessages from "./../common/response-messages.js";
import { getReasonPhrase, StatusCodes } from "http-status-codes";

const requestBodySchema = Joi.object({
  contactNo: Joi.string().length(10).required(),
  journeyDetails: Joi.string().required(),
  pnrNo: Joi.string(),
  type: Joi.string().required(),
  incidentDate: Joi.string().required(),
  grievanceDescription: Joi.string(),
});

export default async (req, res, next) => {
  try {
    const { body: data } = req;

    const { valid, error: validationError } = await utils.validateRequest(
      requestBodySchema,
      data,
    );

    if (!valid)
      return utils.sendResponse(
        {
          status: StatusCodes.BAD_REQUEST,
          message: responseMessages.COMMON.INVALID_INPUT_INFORMATION,
          error: validationError,
        },
        res,
      );
    const {
      contactNo,
      journeyDetails,
      pnrNo,
      type,
      incidentDate,
      grievanceDescription,
    } = data;
    let consumerDetails = {
      contactNo,
      journeyDetails,
      pnrNo,
    };
    let complaintDetails = {
      type,
      incidentDate,
      grievanceDescription,
    };

    const consumerAllDetails = await Services.consumer.create(consumerDetails);
    const { id } = consumerAllDetails;
    complaintDetails.consumerId = id;
    complaintDetails.status = "active";

    await Services.complaint.create(complaintDetails);
    return utils.sendResponse(
      { status: StatusCodes.OK, message: getReasonPhrase(StatusCodes.OK) },
      res,
    );
  } catch (error) {
    console.log("error.........    ", error);
  }
};
