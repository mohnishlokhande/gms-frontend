const ROLES = ["Member", "Trainer", "Admin", "Super Admin"];

export const getRole = (num) => {
  return ROLES[num - 1];
};
