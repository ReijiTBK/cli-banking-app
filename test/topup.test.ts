import { login } from "../src/controller/login";
import { topup } from "../src/controller/topup";
import { pay } from "../src/controller/pay";
import User from "../src/model/user";
import { createUser, getDebt } from "../src/data/db";

describe("Topup Class", () => {
  it("Should update user balance if an existing user with a value is provided", () => {
    let testUser = "Alice";
    let topupValue = 50;
    let originalUser: User = login(testUser);
    let originalBalance: number = originalUser.balance;
    topup(testUser, topupValue);

    let afterTopUpUser: User = login(testUser);
    expect(afterTopUpUser.balance).toBe(originalBalance + topupValue);
  });

  it("Should throw an error if an invalid user is provided", () => {
    let testUser = "WrongUser";
    let topupValue = 50;

    try {
      topup(testUser, topupValue);
      expect(1).toBe(2); //It should not come here, force to fail if it comes here
    } catch (err) {
      expect(err.message).toBe("Please login first before topping up");
    }
  });

  it("Should proceed to return debts if there is any existing debts", () => {
    let testUser = createUser("Alice");
    let testUser2 = createUser("Bob");
    let testUser3 = createUser("Charlie");
    let topupValue = 60;
    let debtValue = 50;
    pay(testUser.name, testUser2.name, debtValue);
    pay(testUser.name, testUser3.name, debtValue);
    topup(testUser.name, topupValue);
    let debtMap = getDebt(testUser.name);
    //This is a bit tricky, because there are 2 debts, 50 dollars each
    //So when i topped up 60 dollars, the first debt user will be removed, so I will only be left with 1 debt user
    //Which will transfer whatever was left after paying the first user
    expect(debtMap[0].balance).toBe(40);
  });
});
