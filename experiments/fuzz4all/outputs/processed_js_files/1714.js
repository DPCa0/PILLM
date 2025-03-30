class BankAccount {
    #balance;  

    constructor(owner, balance = 0) {
        this.owner = owner;
        this.#balance = balance;
    }

    deposit(amount) {
        this.#balance += amount;
        print(`Deposited ${amount}, new balance: ${this.#balance}`);
    }

    withdraw(amount) {
        if (amount > this.#balance) {
            print(`Withdrawal of ${amount} failed. Insufficient funds.`);
        } else {
            this.#balance -= amount;
            print(`Withdrew ${amount}, new balance: ${this.#balance}`);
        }
    }

    get balance() {
        return this.#balance;
    }

    static interestRate = 0.05;

    static calculateInterest(account) {
        return account.#balance * BankAccount.interestRate;
    }
}

const safeTransaction = async (account, operations) => {
    for (let op of operations) {
        await new Promise(resolve => setTimeout(() => {
            if (op.type === 'deposit') {
                account.deposit(op.amount);
            } else if (op.type === 'withdraw') {
                account.withdraw(op.amount);
            }
            resolve();
        }, 1000));
    }
};

const runSimulation = async () => {
    const myAccount = new BankAccount('Alice', 1000);
    const operations = [
        { type: 'deposit', amount: 500 },
        { type: 'withdraw', amount: 200 },
        { type: 'withdraw', amount: 1500 }
    ];

    print(`Initial balance: ${myAccount.balance}`);
    await safeTransaction(myAccount, operations);

    print(`Final balance: ${myAccount.balance}`);
    print(`Interest on final balance: ${BankAccount.calculateInterest(myAccount)}`);
};

runSimulation();
