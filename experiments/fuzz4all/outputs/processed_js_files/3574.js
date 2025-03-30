class BankAccount {
    #balance = 0;
    
    constructor(owner, initialBalance = 0) {
        this.owner = owner;
        this.#balance = initialBalance;
    }
    
    deposit(amount) {
        this.#balance += amount;
        print(`${this.owner} deposited $${amount}. Current balance: $${this.#balance}`);
    }
    
    withdraw(amount) {
        if (amount > this.#balance) {
            print(`Insufficient funds for ${this.owner}. Current balance: $${this.#balance}`);
            return;
        }
        this.#balance -= amount;
        print(`${this.owner} withdrew $${amount}. Current balance: $${this.#balance}`);
    }
    
    getBalance() {
        return this.#balance;
    }
    
    transfer(amount, toAccount) {
        if (amount > this.#balance) {
            print(`Transfer failed. Insufficient funds for ${this.owner}. Current balance: $${this.#balance}`);
            return;
        }
        this.withdraw(amount);
        toAccount.deposit(amount);
    }
}

async function simulateBankOperations() {
    const accountA = new BankAccount('Alice', 500);
    const accountB = new BankAccount('Bob', 300);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    accountA.deposit(150);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    accountA.withdraw(100);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    accountA.transfer(200, accountB);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    print(`Final Balance of Alice: $${accountA.getBalance()}`);
    print(`Final Balance of Bob: $${accountB.getBalance()}`);
}

simulateBankOperations().then(() => print('Bank operations completed.'));
