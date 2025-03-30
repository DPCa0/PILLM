 

 
const _balance = Symbol('balance');
class BankAccount {
    constructor(owner, balance = 0) {
        this.owner = owner;
        this[_balance] = balance;
    }

    deposit(amount) {
        if (amount > 0) {
            this[_balance] += amount;
            print(`Deposited: $${amount}. New balance: $${this[_balance]}`);
        }
    }

    withdraw(amount) {
        if (amount > 0 && this[_balance] >= amount) {
            this[_balance] -= amount;
            print(`Withdrew: $${amount}. New balance: $${this[_balance]}`);
        } else {
            print('Insufficient funds.');
        }
    }

    get balance() {
        return this[_balance];
    }
}

 
const accountHandler = {
    get: function(target, prop) {
        if (prop === 'balance') {
            print(`Accessing balance`);
        }
        return Reflect.get(...arguments);
    },
    set: function(target, prop, value) {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(...arguments);
    }
};

 
const myAccount = new Proxy(new BankAccount('Alice'), accountHandler);

 
async function performBankOperations() {
    await new Promise(resolve => setTimeout(resolve, 1000));  
    myAccount.deposit(1000);
    myAccount.withdraw(500);

    const { balance } = myAccount;   
    print(`Final balance for ${myAccount.owner}: $${balance}`);
}

performBankOperations();
