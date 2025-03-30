 
class BankAccount {
  #balance;  

  constructor(initialBalance) {
    this.#balance = initialBalance;
  }

   
  deposit(amount) {
    if (this.#validateTransaction(amount)) {
      this.#balance += amount;
      print(`Deposited: $${amount}`);
    }
  }

   
  withdraw(amount) {
    if (this.#validateTransaction(amount) && this.#balance >= amount) {
      this.#balance -= amount;
      print(`Withdrew: $${amount}`);
    } else {
      print('Insufficient funds or invalid transaction.');
    }
  }

   
  #validateTransaction(amount) {
    return typeof amount === 'number' && amount > 0;
  }

   
  *accumulateInterest(interestRate) {
    while (true) {
      yield new Promise((resolve) => setTimeout(() => {
        this.#balance *= (1 + interestRate);
        resolve(this.#balance);
      }, 1000));  
    }
  }

   
  static transfer(fromAccount, toAccount, amount) {
    if (fromAccount.#balance >= amount) {
      fromAccount.withdraw(amount);
      toAccount.deposit(amount);
      print(`Transferred $${amount} from Account A to Account B`);
    } else {
      print('Transfer failed due to insufficient funds.');
    }
  }
}

 
async function manageAccounts() {
  const accountA = new BankAccount(1000);
  const accountB = new BankAccount(500);

  accountA.deposit(300);
  accountB.withdraw(200);
  
  const interestGenerator = accountA.accumulateInterest(0.01);
  for (let i = 0; i < 3; i++) {  
    const interestPromise = interestGenerator.next().value;
    const newBalance = await interestPromise;
    print(`New Balance after interest: $${newBalance.toFixed(2)}`);
  }

  BankAccount.transfer(accountA, accountB, 200);
}

manageAccounts();
