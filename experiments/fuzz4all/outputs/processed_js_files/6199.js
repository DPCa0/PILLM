 
async function* fetchData() {
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
        'https://jsonplaceholder.typicode.com/posts/3'
    ];
    
    for (const url of urls) {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            yield data;
        } else {
            throw new Error(`Failed to fetch ${url}`);
        }
    }
}

 
const targetObject = { name: 'John Doe', age: 30 };
const handler = {
    get(target, prop, receiver) {
        print(`Accessed property "${prop}"`);
        return Reflect.get(...arguments);
    },
    set(target, prop, value, receiver) {
        if (prop === 'age' && typeof value !== 'number') {
            throw new TypeError('Age must be a number');
        }
        print(`Setting property "${prop}" to ${value}`);
        return Reflect.set(...arguments);
    }
};

const proxy = new Proxy(targetObject, handler);

 
try {
    print(proxy.name);  
    proxy.age = 31;           
    proxy.age = 'old';        
} catch (error) {
    console.error(error);
}

 
class BankAccount {
    #balance = 0;

    constructor(initialBalance) {
        if (typeof initialBalance === 'number' && initialBalance >= 0) {
            this.#balance = initialBalance;
        }
    }

    deposit(amount) {
        this.#validateAmount(amount);
        this.#balance += amount;
    }

    withdraw(amount) {
        this.#validateAmount(amount);
        if (amount <= this.#balance) {
            this.#balance -= amount;
        } else {
            console.error('Insufficient funds');
        }
    }

    #validateAmount(amount) {
        if (typeof amount !== 'number' || amount <= 0) {
            throw new Error('Amount must be a positive number');
        }
    }

    getBalance() {
        return this.#balance;
    }
}

 
const account = new BankAccount(100);
account.deposit(50);
account.withdraw