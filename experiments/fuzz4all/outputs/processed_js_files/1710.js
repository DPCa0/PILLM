class BankAccount {
  #balance;
  static #transactionFee = 0.01;

  constructor(owner, initialBalance = 0) {
    this.owner = owner;
    this.#balance = initialBalance;
  }

  deposit(amount) {
    if (amount <= 0) throw new Error("Deposit amount must be positive");
    this.#balance += amount;
    return this.#logTransaction('deposit', amount);
  }

  withdraw(amount) {
    if (amount <= 0) throw new Error("Withdrawal amount must be positive");
    const fee = amount * BankAccount.#transactionFee;
    const totalAmount = amount + fee;
    if (totalAmount > this.#balance) throw new Error("Insufficient funds");
    this.#balance -= totalAmount;
    return this.#logTransaction('withdraw', amount, fee);
  }

  #logTransaction(type, amount, fee = 0) {
    return `Transaction: ${type}, Amount: ${amount}, Fee: ${fee.toFixed(2)}, New Balance: ${this.#balance.toFixed(2)}`;
  }

  get balance() {
    return this.#balance.toFixed(2);
  }

  static setTransactionFee(newFee) {
    if (newFee < 0 || newFee > 0.1) throw new Error("Fee must be between 0 and 0.1");
    BankAccount.#transactionFee = newFee;
  }
}

 
const transactionLogger = {
  get(target, property, receiver) {
    const origMethod = target[property];
    if (typeof origMethod === 'function') {
      return function (...args) {
        print(`Executing ${property} with arguments: ${args}`);
        const result = Reflect.apply(origMethod, target, args);
        print(`Result: ${result}`);
        return result;
      };
    }
    return Reflect.get(target, property, receiver);
  }
};

const myAccount = new BankAccount("Alice", 500);
const proxyAccount = new Proxy(myAccount, transactionLogger);

print(proxyAccount.deposit(100));
print(proxyAccount.withdraw(50));
print(`Final balance: $${proxyAccount.balance}`);
