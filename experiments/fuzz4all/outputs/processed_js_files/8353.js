 

 
const _balance = Symbol('balance');

class Account {
  constructor(owner) {
    this.owner = owner;
    this[_balance] = 0;
  }
  
   
  get balance() {
    return (() => this[_balance])();
  }
  
  set balance(amount) {
    if (typeof amount === 'number' && amount >= 0) {
      this[_balance] = (() => amount)();
    } else {
      throw new Error('Invalid amount');
    }
  }
  
  deposit(amount) {
    if (amount > 0) {
      this.balance = this.balance + amount;
      return `Deposited ${amount}, new balance is ${this.balance}`;
    } else {
      throw new Error('Deposit must be positive');
    }
  }

  withdraw(amount) {
    if (amount > 0 && this.balance >= amount) {
      this.balance = this.balance - amount;
      return `Withdrew ${amount}, new balance is ${this.balance}`;
    } else {
      throw new Error('Insufficient funds or invalid amount');
    }
  }
}

 
async function processTransactions(account, transactions) {
  for (const transaction of transactions) {
    await new Promise(resolve => setTimeout(resolve, 500));  
    try {
      if (transaction.type === 'deposit') {
        print(account.deposit(transaction.amount));
      } else if (transaction.type === 'withdraw') {
        print(account.withdraw(transaction.amount));
      }
    } catch (error) {
      console.error(error.message);
    }
  }
}

const myAccount = new Account('John Doe');
const transactions = [
  { type: 'deposit', amount: 100 },
  { type: 'withdraw', amount: 50 },
  { type: 'withdraw', amount: 100 }
];

 
function transactionMessage(strings, transactionType, amount) {
  return `${strings[0]}${transactionType}${strings[1]}${amount}${strings[2]}`;
}

const logTransaction = (type, amount) => {
  print(transactionMessage`Transaction Type: ${type}, Amount: ${amount}.`);
};

async function main() {
  logTransaction('deposit', 100);
  logTransaction('withdraw', 50);
  await processTransactions(myAccount, transactions