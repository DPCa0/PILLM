 
class BankAccount {
  #balance;
  constructor(owner, initialBalance) {
    this.owner = owner;
    this.#balance = initialBalance;
  }

  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      return `Deposited: ${amount}`;
    }
    return 'Invalid deposit amount';
  }

  withdraw(amount) {
    if (amount > 0 && amount <= this.#balance) {
      this.#balance -= amount;
      return `Withdrew: ${amount}`;
    }
    return 'Invalid withdrawal amount';
  }

  get balance() {
    return this.#balance;
  }
}

 
async function simulateBankOperations() {
  const account = new BankAccount('Alice', 1000);

  try {
    print(account.deposit(500));
    print(`Current Balance: ${account.balance}`);

     
    const promise = new Promise((resolve) => {
      setTimeout(() => resolve(account.withdraw(300)), 1000);
    });

    const result = await promise;
    print(result);
    print(`Current Balance: ${account.balance}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

 
const transactionData = [
  { type: 'deposit', amount: 100 },
  { type: 'withdraw', amount: 200 },
];

transactionData.forEach(({ type, amount }) => {
  print(`Transaction Type: ${type}, Amount: ${amount}`);
});

 
simulateBankOperations();
