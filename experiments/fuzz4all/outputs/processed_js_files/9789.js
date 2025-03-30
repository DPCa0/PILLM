 

 
const _balance = Symbol('balance');

class BankAccount {
    constructor(owner, initialBalance) {
        this.owner = owner;
        this[_balance] = initialBalance;
    }
    
     
    get balance() {
        return new Proxy(this, {
            get(target, prop) {
                if (prop === _balance) {
                    print(`Accessed balance for ${target.owner}`);
                    return Reflect.get(target, prop);
                }
                return undefined;
            }
        })[_balance];
    }

    deposit(amount) {
        this[_balance] += amount;
        print(`${this.owner} deposited $${amount}`);
    }

    withdraw(amount) {
        if (amount <= this[_balance]) {
            this[_balance] -= amount;
            print(`${this.owner} withdrew $${amount}`);
        } else {
            print(`Insufficient funds for ${this.owner}`);
        }
    }
}

 
async function simulateTransaction(account, action, amount) {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
    account[action](amount);
}

async function main() {
    const myAccount = new BankAccount('Alice', 1000);

    const transactions = [
        simulateTransaction(myAccount, 'deposit', 200),
        simulateTransaction(myAccount, 'withdraw', 150),
        simulateTransaction(myAccount, 'withdraw', 1300),
        simulateTransaction(myAccount, 'deposit', 500),
    ];

    await Promise.all(transactions);

    print(`Final balance for ${myAccount.owner}: $${myAccount.balance}`);
}

main().catch(console.error);
