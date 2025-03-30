 

 
const _balance = Symbol('balance');

 
const handler = {
  get(target, prop, receiver) {
    if (prop === 'balance') {
      return Reflect.get(target, _balance, receiver);
    }
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value) {
    if (prop === 'balance') {
      throw new Error('Cannot directly set balance');
    }
    return Reflect.set(target, prop, value);
  }
};

 
class BankAccount {
  constructor(owner, initialBalance) {
    this.owner = owner;
    this[_balance] = initialBalance;
  }

  deposit(amount) {
    return new Promise((resolve, reject) => {
      if (amount <= 0) reject('Deposit amount must be positive');
      setTimeout(() => {
        this[_balance] += amount;
        resolve(`Deposited: ${amount}`);
      }, 1000);
    });
  }

  withdraw(amount) {
    return new Promise((resolve, reject) => {
      if (amount > this[_balance]) reject('Insufficient funds');
      setTimeout(() => {
        this[_balance] -= amount;
        resolve(`Withdrew: ${amount}`);
      }, 1000);
    });
  }

  *transactionHistory() {
    yield 'Opening account';
    yield 'No transactions yet';
  }
}

 
async function executeTransactions(account) {
  try {
    print(await account.deposit(500));
    print(await account.withdraw(200));
  } catch (error) {
    console.error(error);
  }
}

 
const accountProxy = new Proxy(new BankAccount('Alice', 1000), handler);

 
executeTransactions(accountProxy).then(() => {
  print(`Final Balance: ${accountProxy.balance}`);

   
  const history = accountProxy.transactionHistory();
  print(history.next().value);
  print(history.next().value);
});
