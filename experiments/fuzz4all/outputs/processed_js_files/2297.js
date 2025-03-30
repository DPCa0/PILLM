 
const _balance = Symbol('balance');

class Account {
    constructor(owner, balance = 0) {
        this.owner = owner;
        this[_balance] = balance;
    }
    
    getBalance() {
        return this[_balance];
    }
    
    deposit(amount) {
        if (amount > 0) this[_balance] += amount;
        return this[_balance];
    }
    
    withdraw(amount) {
        if (amount > 0 && amount <= this[_balance]) this[_balance] -= amount;
        return this[_balance];
    }
}

 
const accountHandler = {
    get(target, property, receiver) {
        print(`Getting ${property}`);
        return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
        print(`Setting ${property} to ${value}`);
        return Reflect.set(target, property, value, receiver);
    }
};

 
function* accountGenerator(names) {
    for (let name of names) {
        yield new Proxy(new Account(name), accountHandler);
    }
}

 
async function manageAccounts(names) {
    const accountIterator = accountGenerator(names);

    for (let account of accountIterator) {
        print(`Created account for ${account.owner}`);
        
        account.deposit(1000);
        print(`Balance after deposit: ${account.getBalance()}`);
        
        await new Promise(resolve => setTimeout(resolve, 1000));   
        account.withdraw(500);
        
        print(`Balance after withdrawal: ${account.getBalance()}`);
    }
}

const names = ['Alice', 'Bob', 'Charlie'];
manageAccounts(names);
