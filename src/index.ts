import * as readline from "readline";
import { login } from "./controller/login";
import { topup } from "./controller/topup";
import { pay } from "./controller/pay";
import { getDebt, getOwefrom } from "./controller/debt";
import User from "./model/user";
import { getUser, initDB } from "./data/db";
import { parsedProperNumber } from "./utililities/util";
initDB();

let mockSession: User;
let promptStr: string =
  "\nCLI Banking App\n" +
  "Available commands\n" +
  "login <client> : Login as client. Creates a new client if not yet exists.\n" +
  "topup <amount> : Increase logged-in client balance by amount.\n" +
  "pay <another_client> <amount> : Pay amount from logged-in client to another_client, maybe\n" +
  "quit : Quit CLI Banking App\n\n" +
  "Enter command: ";

console.log(promptStr);

const rl: readline.Interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let promptQns = () => {
  rl.question(">", (input) => {
    processCommand(input);
  });

  const processCommand = (input: string) => {
    let commandArgs = input.split(" ");
    let command: string = commandArgs[0];
    try {
      switch (command.toLowerCase()) {
        case "login":
          let username: string = commandArgs[1];
          let loginResult: User = login(username);
          mockSession = loginResult;
          console.log(`Hello, ${loginResult.name}!`);
          break;
        case "topup":
          let topupStr: string = commandArgs[1];
          let topupValue: number = parsedProperNumber(topupStr);
          let topupResult: string;
          topupResult = topup(mockSession.name, topupValue);
          console.log(topupResult);
          break;
        case "pay":
          let payStr: string = commandArgs[2];
          let payValue: number = parsedProperNumber(payStr);
          let toUser: string = commandArgs[1];
          let payResult: string = pay(mockSession.name, toUser, payValue);
          console.log(payResult);
          break;
        case "quit":
          console.log("Thank you for using CLI Banking App!");
          return rl.close();
        default:
          console.log("Invalid option, please try again");
      }
    } catch (error) {
      console.log("An error occured:", error.message);
    }
    if (mockSession) {
      displayDefaultMsg(mockSession.name);
    }
    promptQns();
  };
};

const displayDefaultMsg = (username: string) => {
  let user: User = getUser(username);
  let msg = `Your balance is ${user.balance}\n`;
  let debts = getDebt(username);
  if (debts) {
    for (let i = 0; i < debts.length; i++) {
      msg += `Owing ${debts[i].balance} to ${debts[i].name}\n`;
    }
  }
  let oweFrom = getOwefrom(username);
  if (oweFrom) {
    for (let i = 0; i < oweFrom.length; i++) {
      msg += `Owing ${oweFrom[i].balance} from ${oweFrom[i].name}\n`;
    }
  }
  console.log(msg);
};

promptQns();
