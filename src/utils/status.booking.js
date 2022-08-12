const status = (data) => {
  if (data.reviewStar !== null && data.reviewContent !== null) {
    return 'Completed';
  }

  if (data.isActive === 0 && data.reviewStar === null) {
    return 'Waiting for review';
  }

  if (data.isActive === 1) {
    return 'Active';
  }
};

module.exports = status;
