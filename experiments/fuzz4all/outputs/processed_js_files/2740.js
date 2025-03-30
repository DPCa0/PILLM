 

 
const logger = (target) => new Proxy(target, {
    get(obj, prop) {
        print(`Accessed property: ${prop}`);
        return prop in obj ? obj[prop] : 'Property does not exist';
    },
    set(obj, prop, value) {
        print(`Setting property: ${prop} to ${value}`);
        obj[prop] = value;
        return true;
    }
});

 
let user = logger({
    name: 'Alice',
    age: 25
});

 
print(user.name);
user.age = 26;

 
const fetchData = async (urls) => {
    try {
        const promises = urls.map(async (url) => {
            const response = await fetch(url);
            return response.json();
        });

        const results = await Promise.all(promises);
        print(results);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

 
fetchData(['https://api.example.com/data1', 'https://api.example.com/data2']);

 
function* idGenerator() {
    let id = 0;
    while (true) {
        yield id++;
    }
}

 
const gen = idGenerator();
print(gen.next().value);  
print(gen.next().value);  

 
class Counter {
    #count = 0;

    increment() {
        this.#count++;
    }

    getCount() {
        return this.#count;
    }
}

const counter = new Counter();
counter.increment();
print(counter.getCount());  

 
(() => {
    const message = 'IIFE executed!';
    print(message);
})();

 
const uniqueSymbol = Symbol('unique');
const objWithSymbol = {
    [uniqueSymbol]: 'Symbolic Value'
};

print(objWithSymbol[uniqueSymbol]);

 
const privateData = new WeakMap();

class Example {
    constructor(secret) {
        privateData.set(this, secret);
    }

    reveal() {
        return privateData.get(this);