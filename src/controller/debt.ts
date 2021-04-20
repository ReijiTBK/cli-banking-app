import User from "../model/user";
import { getDebt as getDBDebt, getOweFrom, updateDebt } from "../data/db";

export const getDebt = (username: string): Array<User> => {
  return getDBDebt(username);
};

export const getOwefrom = (username: string): Array<User> => {
  return getOweFrom(username);
};
