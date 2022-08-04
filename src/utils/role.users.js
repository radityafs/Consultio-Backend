const role = (roleId) => {
  if (roleId === 1) {
    return 'admin';
  }
  if (roleId === 2) {
    return 'user';
  }
  if (roleId === 3) {
    return 'law-consultant';
  }
  if (roleId === 4) {
    return 'health-consultant';
  }

  return 'user';
};

module.exports = role;
