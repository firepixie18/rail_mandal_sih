import utils from "../utils/index.js";

function errorHandler(err, req, res, next) {
  console.error(err.stack);
  return utils.sendResponse(
    {
      status: 500,
      message: "Internal Server Error",
    },
    res,
  );
}

export default errorHandler;
