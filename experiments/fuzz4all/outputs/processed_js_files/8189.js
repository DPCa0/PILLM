 
const handler = {
    get: (target, property) => {
        if (property in target) {
            print(`Getting value of ${property}`);
            return Reflect.get(target, property);
        } else {
            throw new ReferenceError(`Property ${property} does not exist.`);
        }
    },
    set: (target, property, value) => {
        if (typeof value === 'number') {
            print(`Setting value of ${property} to ${value}`);
            return Reflect.set(target, property, value);
        } else {
            throw new TypeError(`Value of ${property} must be a number.`);
        }
    }
};

const obj = new Proxy({a: 1, b: 2}, handler);

 
async function fetchData(url) {
    print(`Fetching data from ${url}`);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

 
function calculate({operation, numbers = [0, 0]}) {
    const [a, b, ...rest] = numbers;
    switch (operation) {
        case 'add':
            return a + b;
        case 'subtract':
            return a - b;
        default:
            throw new Error('Unsupported operation');
    }
}

 
function tag(strings, ...values) {
    print(strings.raw[0], values[0]);
    return `${strings[0]}${values[0]}`;
}

const name = 'John Doe';
const greeting = tag`Hello, ${name}!`;

 
(async () => {
    try {
        const modulePath = './someModule.js';
        print(`Loading module: ${modulePath}`);
        const { default: someFunction } = await import(modulePath);
        someFunction();
    } catch (error) {
        console.error('Failed to load module:', error);
    }
})();

 
try {
    print(obj.a);    
    obj.b = 3;            
    obj.c = 'not-a-number';  
} catch (error) {
    console.error(error.message);
}

 
try {
    console.log(calculate