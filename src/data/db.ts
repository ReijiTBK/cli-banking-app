import User from "../model/user";
import { initCapString } from "../utililities/util";

let userDB: Map<string, User> = new Map();

let debtDB: Map<string, Array<User>> = new Map();

export const initDB = () => {
  createUser("alice");
  createUser("bob");
  createUser("charlie");
};

export const getUser = (username: string): User => {
  let result: User;
  username = initCapString(username);
  result = userDB.get(username);

  return result;
};

export const createUser = (username: string): User => {
  username = initCapString(username);
  let user: User = new User(username, 0);
  userDB.set(user.name, user);
  return user;
};

export const updateValue = (username: string, user: User) => {
  username = initCapString(username);
  userDB.set(username, user);
};

export const getDebt = (username: string): Array<User> => {
  username = initCapString(username);
  let debtedUser: Array<User> = debtDB.get(username);
  return debtedUser;
};

export const updateDebt = (fromUser: string, userObj: Array<User>) => {
  fromUser = initCapString(fromUser);
  debtDB.set(fromUser, userObj);
};

export const getOweFrom = (username: string): Array<User> => {
  username = initCapString(username);
  let result: Array<User> = new Array();
  debtDB.forEach((debtArr, key) => {
    if (debtArr) {
      for (let i = 0; i < debtArr.length; i++) {
        if (debtArr[i].name === username) {
          result.push(new User(key, debtArr[i].balance));
        }
      }
    }
  });
  return result;
};
