/* eslint-disable implicit-arrow-linebreak */
module.exports = {
  success: (res, code, data) =>
    res.status(code).send({
      status: "success",
      data
    }),
  failed: (res, code, message, customData) =>
    res.status(code).send({
      status: "failed",
      message: message || "Something went wrong",
      data: { ...customData }
    }),
  error: (res, error) =>
    res.status(500).json({
      status: "error",
      message: error.message
    })
};
