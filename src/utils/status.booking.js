const status = (data) => {
  if (data.rating !== null && data.review !== null) {
    return "Completed";
  }

  if (data.isActive === 0 && data.rating === null) {
    return "Waiting for review";
  }

  if (data.isActive === 1) {
    return "Active";
  }
};

module.exports = status;
