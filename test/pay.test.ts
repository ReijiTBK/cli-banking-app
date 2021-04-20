import { pay } from "../src/controller/pay";
import User from "../src/model/user";
import { topup } from "../src/controller/topup";
import { createUser, getUser, getDebt } from "../src/data/db";

describe("Pay Class", () => {
  it("should topup other user account without any debt if sufficient balance", () => {
    //Test setup
    let topUpValue = 120;
    createUser("TestUser1");
    createUser("TestUser2");
    topup("TestUser1", topUpValue);

    let payValue = 50;
    pay("TestUser1", "TestUser2", payValue);
    let user1: User = getUser("TestUser1");
    let user2: User = getUser("TestUser2");

    expect(user1.balance).toBe(topUpValue - payValue);
    expect(user2.balance).toBe(payValue);
  });

  it("should create debt record if payer does not have sufficient balance", () => {
    //Test setup
    let topUpValue = 20;
    createUser("DebtUser1");
    createUser("DebtUser2");
    topup("DebtUser1", topUpValue);

    let payValue = 50;
    pay("DebtUser1", "DebtUser2", payValue);
    let user1: User = getUser("DebtUser1");
    let user2: User = getUser("DebtUser2");

    expect(user1.balance).toBe(0);
    expect(user2.balance).toBe(topUpValue);

    let debtMap = getDebt("DebtUser1");
    expect(debtMap[0].name).toBe("DebtUser2");
    expect(debtMap[0].balance).toBe(payValue - topUpValue);
  });

  it("should should throw error if Im trying to pay myself", () => {
    //Test setup
    let payValue = 50;
    try {
      pay("TestUser1", "TestUser1", payValue);
      expect(1).toBe(2);
    } catch (err) {
      expect(err.message).toBe("Sorry! You can't transfer to yourself!");
    }
  });

  it("should throw error if user dont exist", () => {
    //Test setup
    let topUpValue = 120;
    createUser("TestUser1");
    topup("TestUser1", topUpValue);

    let payValue = 50;
    try {
      pay("TestUser1", "InvalidUser", payValue);
      expect(1).toBe(2);
    } catch (err) {
      expect(err.message).toBe("Please ensure the account specified exist");
    }
  });
});
