interface UserInterface {
  name: string;
  balance: number;
}

export default class User implements UserInterface {
  name: string;
  balance: number;

  constructor(name: string, balance: number) {
    this.name = this.initCapString(name);
    this.balance = balance;
  }

  initCapString = (value: string): string => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };
}
