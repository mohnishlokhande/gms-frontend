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

function classReg(className) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}
const hasClass = function (elem, c) {
  return elem.classList.contains(c);
};
const removeClass = function (elem, c) {
  elem.className = elem.className.replace(classReg(c), " ");
};
const addClass = function (elem, c) {
  if (!hasClass(elem, c)) {
    elem.className = elem.className + " " + c;
  }
};
export const classChange = (elem, c) => {
  let fn = hasClass(elem, c) ? removeClass : addClass;
  fn(elem, c);
};

export const intervalFormat = (years, months, days) => {
  if (years === 0 && months === 0 && days === 0) return "Not availabe";

  let s = "";
  if (years !== 0) {
    s = s + years.toString() + " Years";
  }
  if (months !== 0) {
    if (s !== "") s += ", ";
    s = s + months.toString() + " Months";
  }
  if (days !== 0) {
    if (s !== "") s += ", ";
    s = s + days.toString() + " Days";
  }
  return s;
};

export const determineInputType = (value) => {
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isPhoneNumber = /^\d{10}$/.test(value);

  if (isEmail) {
    return "email";
  } else if (isPhoneNumber) {
    return "phone";
  }

  return "invalid";
};
