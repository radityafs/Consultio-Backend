const role = (roleId) => {
  if (roleId === 1) {
    return 'ADMIN';
  }
  if (roleId === 2) {
    return 'USER';
  }
  if (roleId === 3) {
    return 'LAWYER';
  }
  if (roleId === 4) {
    return 'PSYCHOLOGIST';
  }

  return 'USER';
};

module.exports = role;
