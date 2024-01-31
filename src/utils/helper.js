const ROLES = ["Member", "Trainer", "Admin", "Super Admin"];

export const getRole = (num) => {
  return ROLES[num - 1];
};

export const getFormatDate = (date) => {
  let temp = new Date(date);
  return (
    temp.getDate() + "/" + (temp.getMonth() + 1) + "/" + temp.getFullYear()
  );
};
