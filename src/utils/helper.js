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

export function increaseDate(originalDate, days, months, years) {
  const newDate = new Date(originalDate);
  newDate.setDate(newDate.getDate() + days);
  newDate.setMonth(newDate.getMonth() + months);
  newDate.setFullYear(newDate.getFullYear() + years);

  return newDate.toISOString().split("T")[0];
}
