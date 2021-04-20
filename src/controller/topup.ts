import {
  getUser as dbLogin,
  updateValue,
  getDebt,
  updateDebt,
} from "../data/db";
import User from "../model/user";

export const topup = (username: string, value: number): string => {
  let user = dbLogin(username);
  let result: string;
  if (user) {
    let newValue = user.balance + value;
    user.balance = newValue;
    result = paybackDebt(user);
    updateValue(username, user);
  } else {
    throw new Error("Please login first before topping up");
  }

  return result;
};

const paybackDebt = (user: User): string => {
  let userDebt: Array<User> = getDebt(user.name);
  let paybackResult: string = "";
  if (userDebt) {
    let index = 0;
    while (userDebt[index]) {
      if (user.balance >= userDebt[index].balance) {
        user.balance = user.balance - userDebt[index].balance;
        paybackResult += `Transferred ${userDebt[index].balance} to ${userDebt[index].name}\n`;
        userDebt.shift();
      } else {
        userDebt[index].balance = userDebt[index].balance - user.balance;
        paybackResult += `Transferred ${user.balance} to ${userDebt[index].name}\n`;
        user.balance = 0;
        index++;
      }
    }
  }
  updateDebt(user.name, userDebt);
  return paybackResult;
};
