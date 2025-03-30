 
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
}

 
const handler = {
    get(target, prop, receiver) {
        if (!(prop in target)) {
            console.warn(`Property ${prop} does not exist`);
            return undefined;
        }
        print(`Getting value of ${prop}`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
        print(`Setting value of ${prop} to ${value}`);
        if (prop in target) {
            return Reflect.set(target, prop, value, receiver);
        } else {
            console.warn(`Property ${prop} does not exist`);
            return false;
        }
    }
};

 
const user = new Proxy({ name: "Alice", age: 30 }, handler);

 
function createCounter() {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}

 
const UNIQUE_KEY = Symbol('unique');

 
class Person {
    #name;
    constructor(name) {
        this.#name = name;
    }

    greet() {
        return `Hello, my name is ${this.#name}`;
    }

    static species() {
        return "Homo sapiens";
    }
}

 
const alice = new Person('Alice');

 
async function getDataFromMultipleSources() {
    try {
        const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
        const results = await Promise.all(urls.map(url => fetchData(url)));
        print('Data fetched from multiple sources:', results);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
(async () => {
    user.name = "Bob";          
    print(user.name);     

    const counter = createCounter();
    print(counter.increment());  