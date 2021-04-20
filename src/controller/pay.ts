import { getUser, updateValue, getDebt, updateDebt } from "../data/db";
import User from "../model/user";

export const pay = (
  fromUser: string,
  toUser: string,
  amount: number
): string => {
  if (fromUser === toUser) {
    throw new Error("Sorry! You can't transfer to yourself!");
  }
  let fromAcc: User = getUser(fromUser);
  let toAcc: User = getUser(toUser);
  let result: string;
  if (fromAcc && toAcc) {
    if (fromAcc.balance >= amount) {
      fromAcc.balance = fromAcc.balance - amount;
      toAcc.balance = toAcc.balance + amount;
      updateValue(fromAcc.name, fromAcc);
      updateValue(toAcc.name, toAcc);
      result = `Transferred ${amount} to ${toUser}`;
    } else {
      let debtAmount = amount - fromAcc.balance;
      let userDebts = getDebt(fromUser);
      userDebts = userDebts ? userDebts : new Array();
      let updated = false;
      for (let i = 0; i < userDebts.length; i++) {
        if (userDebts[i].name === toUser) {
          let debtBal = userDebts[i].balance;
          debtBal = debtBal + debtAmount;
          userDebts[i].balance = debtBal;
          updated = true;
          break;
        }
      }

      if (!updated) {
        userDebts.push(new User(toUser, debtAmount));
      }
      updateDebt(fromUser, userDebts);
      result = `Transferred ${fromAcc.balance} to ${toUser}`;
      toAcc.balance = toAcc.balance + fromAcc.balance;
      fromAcc.balance = 0;

      updateValue(fromAcc.name, fromAcc);
      updateValue(toAcc.name, toAcc);
    }
    return result;
  } else {
    throw new Error("Please ensure the account specified exist");
  }
};
