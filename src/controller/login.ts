import { getUser as dbLogin, createUser } from "../data/db";
import User from "../model/user";

export const login = (username: string): User => {
  let result = dbLogin(username);

  if (!result) {
    result = createUser(username);
  }
  return result;
};
