export const parsedProperNumber = (value: string): number => {
  let isNum = /^\d+$/.test(value);
  if (isNum) {
    return parseInt(value);
  } else {
    throw new Error("Please enter proper numbers");
  }
};

export const initCapString = (value: string): string => {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};
