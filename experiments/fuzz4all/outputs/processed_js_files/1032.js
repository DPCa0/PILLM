 
const handler = {
    get(target, prop, receiver) {
        if (prop in target) {
            print(`Getting property '${prop}'`);
            return Reflect.get(target, prop, receiver);
        }
        return `Property '${prop}' doesn't exist`;
    },
    set(target, prop, value) {
        print(`Setting property '${prop}' to ${value}`);
        return Reflect.set(target, prop, value);
    }
};

// Create an object with Proxy
const data = new Proxy({}, handler);

// Utilize Symbol and Map for unique identification and storage
const uniqueId = Symbol('id');
data[uniqueId] = 1;

const map = new Map();
map.set(data, "Stored with uniqueId");

// Use destructuring and spread operator in a function
function processData({ name, age, ...rest }) {
    print(`Processing data for ${name}, age ${age}`);
    print('Additional data:', rest);
}

// Utilize Promise and async/await for handling asynchronous operations
function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ name: 'Alice', age: 30, city: 'Wonderland' }), 1000);
    });
}

async function execute() {
    // Using optional chaining and nullish coalescing operators
    const response = await fetchData();
    const country = response?.country ?? 'Unknown';
    print(`Country: ${country}`);

    processData({ ...response });
}

execute();

 
const expression = (x, y) => x + y;
print(`The sum of 4 and 5 is: ${expression(4, 5)}`);

 
function sum(a = 0, b = 0, ...rest) {
    const restSum = rest.reduce((acc, num) => acc + num, 0);
    return a + b + restSum;
}

print(`Sum with rest parameters: ${sum(1, 2, 3, 4, 5)}`);
