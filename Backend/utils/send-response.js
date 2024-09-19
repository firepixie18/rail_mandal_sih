import { getReasonPhrase, StatusCodes } from "http-status-codes";

export default (data, res) => {
  let responseToSend = {
    status: data.status || data.error.responseFlag || StatusCodes.BAD_REQUEST,
    message:
      data.message ||
      data.error.responseMessage ||
      getReasonPhrase(StatusCodes.BAD_REQUEST),
  };
  if (data.description) responseToSend.description = data.description;
  if (data.data) responseToSend.data = data.data;

  return res.status(responseToSend.status).json(responseToSend);
};
