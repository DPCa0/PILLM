 
class CryptoWallet {
    constructor(owner) {
        this.owner = owner;
        this[balanceSymbol] = 0;
    }

     
    [validateTransaction](amount) {
        if (amount <= 0) {
            throw new Error('Invalid transaction amount.');
        }
    }

    deposit(amount) {
        this[validateTransaction](amount);
        this[balanceSymbol] += amount;
        print(`Deposited: ${amount}. New Balance: ${this.getBalance()}`);
    }

    withdraw(amount) {
        this[validateTransaction](amount);
        if (amount > this[balanceSymbol]) {
            throw new Error('Insufficient funds.');
        }
        this[balanceSymbol] -= amount;
        print(`Withdrew: ${amount}. New Balance: ${this.getBalance()}`);
    }

    getBalance() {
        return this[balanceSymbol];
    }
}

const balanceSymbol = Symbol('balance');
const validateTransaction = Symbol('validateTransaction');

 
async function performTransactions(wallet) {
    try {
        await new Promise((resolve) => setTimeout(() => {
            wallet.deposit(100);
            resolve();
        }, 1000));

        await new Promise((resolve) => setTimeout(() => {
            wallet.withdraw(50);
            resolve();
        }, 1000));

        await new Promise((resolve, reject) => setTimeout(() => {
            try {
                wallet.withdraw(100);
                resolve();
            } catch (error) {
                reject(error);
            }
        }, 1000));
    } catch (error) {
        console.error(error.message);
    }
}

 
const myWallet = new CryptoWallet('Alice');
performTransactions(myWallet);
