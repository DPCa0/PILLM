 
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        print(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}

 
const _secret = Symbol('secret');

class SecretAgent extends Person {
    constructor(name, age, codeName) {
        super(name, age);
        this.codeName = codeName;
        this[_secret] = 'Top Secret';
    }

    revealSecret() {
        print(`${this.name}'s secret is: ${this[_secret]}`);
    }
}

// Use Proxy to intercept operations on an object
const handler = {
    get: function(target, prop, receiver) {
        if (prop in target) {
            return target[prop];
        } else {
            print(`Property "${prop}" doesn't exist.`);
            return false;
        }
    }
};

const agent = new SecretAgent('James Bond', 40, '007');
const proxiedAgent = new Proxy(agent, handler);

 
function* taskQueue(agent) {
    yield agent.greet();
    yield agent.revealSecret();
    yield print(`Agent's code name is ${agent.codeName}`);
    yield agent.fakeProperty; // Will trigger Proxy's get trap
}

const tasks = taskQueue(proxiedAgent);

 
for (let task of tasks) {
     
}

 
function delayedMessage(message, delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            print(message);
            resolve();
        }, delay);
    });
}

async function runAsyncOperations() {
    await delayedMessage('Starting async operations...', 1000);
    await delayedMessage('Performing a classified task...', 2000);
    await delayedMessage('Mission Complete!', 1000);
}

runAsyncOperations();
