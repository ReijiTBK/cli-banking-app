import { login } from "../src/controller/login";
import { createUser } from "../src/data/db";
import User from "../src/model/user";
import * as db from "../src/data/db";

describe("Login Class", () => {
  it("should not call createUser function and it should return the user from the DB if user exists in the 'DB'", () => {
    //Pre-req function before spying
    createUser("alice");

    let spy = jest.spyOn(db, "createUser");
    let result: User = login("Alice");
    expect(spy).not.toHaveBeenCalled();
    expect(result.name).toBe("Alice");
    expect(result.balance).toBe(0);
    spy.mockRestore();
  });

  it("should call createUser function and return the user object if user don't exist in 'DB'", () => {
    let spy = jest.spyOn(db, "createUser");
    let result: User = login("Carrie");

    expect(spy).toHaveBeenCalled();
    expect(result.name).toBe("Carrie");
    expect(result.balance).toBe(0);

    spy.mockRestore();
  });
});
