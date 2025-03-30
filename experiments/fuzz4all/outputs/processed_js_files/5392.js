 

 
const _balance = Symbol('balance');

 
class BankAccount {
  constructor(owner, initialBalance) {
    this.owner = owner;
    this[_balance] = initialBalance;
  }

   
  deposit(amount) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (amount <= 0) reject(new Error('Deposit amount must be positive'));
        this[_balance] += amount;
        resolve(`Deposited: $${amount}`);
      }, 1000);
    });
  }

   
  async getBalance() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this[_balance]), 500);
    });
  }
}

 
const bankHandler = {
  get: function (target, prop, receiver) {
    if (prop === 'balance') {
      throw new Error('Accessing balance directly is not allowed');
    }
    return Reflect.get(...arguments);
  },
};

 
async function performBankOperations() {
  const account = new BankAccount('Alice', 500);
  const proxiedAccount = new Proxy(account, bankHandler);

  try {
    print(await proxiedAccount.deposit(150));
    print('Current Balance:', await proxiedAccount.getBalance());

    print(await proxiedAccount.deposit(-20));  
  } catch (err) {
    console.error(err.message);
  }

  try {
    print(proxiedAccount.balance);  
  } catch (err) {
    console.error(err.message);
  }
}

performBankOperations();
