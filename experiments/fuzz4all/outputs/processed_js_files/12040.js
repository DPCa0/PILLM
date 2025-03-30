class BankAccount {
  #balance = 0;  

  constructor(accountHolder, balance) {
    this.accountHolder = accountHolder;
    this.#balance = balance;
  }

  deposit(amount) {
    if (amount > 0) this.#balance += amount;
    return this.#balance;
  }

  withdraw(amount) {
    if (amount > 0 && amount <= this.#balance) this.#balance -= amount;
    return this.#balance;
  }

  getBalance() {
    return this.#balance;
  }

  static transfer(amount, fromAccount, toAccount) {
    if (fromAccount.withdraw(amount)) {
      toAccount.deposit(amount);
      return true;
    }
    return false;
  }
}

 
const accountHandler = {
  get(target, prop, receiver) {
    if (typeof target[prop] === 'function' && ['deposit', 'withdraw'].includes(prop)) {
      return function (...args) {
        print(`Operation: ${prop}, Amount: ${args[0]}`);
        return target[prop].apply(this, args);
      };
    }
    return Reflect.get(target, prop, receiver);
  },
};

 
const aliceAccount = new Proxy(new BankAccount('Alice', 1000), accountHandler);
const bobAccount = new Proxy(new BankAccount('Bob', 500), accountHandler);

print('Initial Balances:');
print(`Alice: $${aliceAccount.getBalance()}`);
print(`Bob: $${bobAccount.getBalance()}`);

aliceAccount.deposit(200);
bobAccount.withdraw(100);
BankAccount.transfer(150, aliceAccount, bobAccount);

print('Final Balances:');
print(`Alice: $${aliceAccount.getBalance()}`);
print(`Bob: $${bobAccount.getBalance()}`);
