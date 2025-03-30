 
class BankAccount {
    #balance = 0;  

    constructor(owner) {
        this.owner = owner;
    }

    deposit(amount) {
        this.#updateBalance(amount);
    }

    withdraw(amount) {
        if (amount <= this.#balance) {
            this.#updateBalance(-amount);
        } else {
            console.error('Insufficient funds');
        }
    }

    getBalance() {
        return this.#balance;
    }

     
    #updateBalance(amount) {
        this.#balance += amount;
    }

    static transfer(source, destination, amount) {
        if (source instanceof BankAccount && destination instanceof BankAccount) {
            source.withdraw(amount);
            destination.deposit(amount);
        } else {
            console.error('Transfer requires valid BankAccount instances');
        }
    }
}

 
const accountHandler = {
    set(target, property, value) {
        if (property === 'amount' && (typeof value !== 'number' || value <= 0)) {
            throw new TypeError('Amount must be a positive number');
        }
        target[property] = value;
        return true;
    }
};

const createValidatedAccount = (owner) => {
    const account = new BankAccount(owner);
    return new Proxy(account, accountHandler);
};

 
async function simulateTransactions() {
    const acc1 = createValidatedAccount('Alice');
    const acc2 = createValidatedAccount('Bob');

    try {
        acc1.deposit(1000);
        acc2.deposit(500);
        print('Initial Balances:', acc1.getBalance(), acc2.getBalance());

        await new Promise((resolve) => setTimeout(resolve, 1000));  

        BankAccount.transfer(acc1, acc2, 200);
        print('After Transfer Balances:', acc1.getBalance(), acc2.getBalance());
    } catch (error) {
        console.error('Transaction error:', error);
    }
}

simulateTransactions();
