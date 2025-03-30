 

 
const handler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`Accessing property "${prop}"`);
            return target[prop];
        } else {
            throw new Error(`Property "${prop}" does not exist.`);
        }
    }
};

const targetObject = {
    message: 'Hello, advanced JavaScript!',
    calculate: (a, b) => a + b
};

const proxy = new Proxy(targetObject, handler);

 
async function fetchData() {
     
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Fetched data successfully!');
        }, 1000);
    });
}

async function processAsync() {
    try {
        const data = await fetchData();
        print(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

 
class Calculator {
    static multiply(a, b) {
        return a * b;
    }

    constructor(initialValue = 0) {
        this.value = initialValue;
    }

    add(number) {
        this.value += number;
        return this;
    }

    subtract(number) {
        this.value -= number;
        return this;
    }

    result() {
        print(`Current value: ${this.value}`);
    }
}

 
(() => {
    const calc = new Calculator();
    calc.add(10).subtract(4).result();

    const product = Calculator.multiply(5, 6);
    print(`Product: ${product}`);

    processAsync();
    
    print(proxy.message);
    print(`Calculation result: ${proxy.calculate(2, 3)}`);
})();

 
const uniqueSet = new Set([1, 2, 3, 2, 1]);
print('Unique values:', [...uniqueSet]);

const keyValueMap = new Map();
keyValueMap.set('key1', 'value1').set('key2', 'value2');
print('Map content:', Array.from(keyValueMap.entries()));
