const { CustomAPIError } = require("../errors/customError");

//errorHandler middleware
const errorHandler = (err, req, res, next) => {
  //checking whether the error is custom error or not
  if (err instanceof CustomAPIError) {
    return res
      .status(err.statusCode)
      .json({ success: false, msg: err.message });
  }

  //sending the default message
  return res
    .status(500)
    .json({ msg: "Something went wrong! , please try again", err });
};

//export of errorHandler middleware
module.exports = errorHandler;
