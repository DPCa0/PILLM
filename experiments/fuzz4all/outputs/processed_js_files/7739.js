 

 
const { EventEmitter } = require('events');

 
const _balance = Symbol('balance');
class BankAccount extends EventEmitter {
    constructor(accountHolder, initialBalance) {
        super();
        this.accountHolder = accountHolder;
        this[_balance] = initialBalance;

        this.on('deposit', this.#logTransaction);
        this.on('withdraw', this.#logTransaction);
    }

    #logTransaction = (amount, type) => {
        print(`${type} of $${amount} made by ${this.accountHolder}. Current balance: $${this.getBalance()}`);
    };

    deposit(amount) {
        this[_balance] += amount;
        this.emit('deposit', amount, 'Deposit');
    }

    withdraw(amount) {
        if (amount > this[_balance]) {
            throw new Error('Insufficient funds');
        }
        this[_balance] -= amount;
        this.emit('withdraw', amount, 'Withdrawal');
    }

    getBalance() {
        return this[_balance];
    }
}

 
(async () => {
    try {
        const account = new BankAccount('Alice', 1000);

        const depositPromise = new Promise((resolve, reject) => {
            try {
                account.deposit(500);
                resolve();
            } catch (err) {
                reject(err);
            }
        });

        const withdrawalPromise = new Promise((resolve, reject) => {
            try {
                account.withdraw(200);
                resolve();
            } catch (err) {
                reject(err);
            }
        });

         
        await Promise.all([depositPromise, withdrawalPromise]);

        print(`Final balance for ${account.accountHolder}: $${account.getBalance()}`);
    } catch (error) {
        console.error('Transaction Error:', error.message);
    }
})();
