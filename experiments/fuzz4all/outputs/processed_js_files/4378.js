 
'use strict';

 
const handler = {
    get(target, property, receiver) {
        print(`Getting property ${property}`);
        return Reflect.get(...arguments);
    },
    set(target, property, value, receiver) {
        print(`Setting property ${property} to ${value}`);
        return Reflect.set(...arguments);
    }
};

let user = { name: "Alice", age: 25 };
let proxyUser = new Proxy(user, handler);

proxyUser.name;  
proxyUser.age = 30;  

 
(async function fetchData() {
    try {
        const response = await fetch('https://api.github.com');
        if (!response.ok) throw new Error('Network response was not ok.');
        
        const data = await response.json();
        print('Fetched data:', data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
})();

 
const map = new Map();
const weakMap = new WeakMap();

const objKey = { id: 1 };
map.set(objKey, 'User Object');

weakMap.set(objKey, 'Sensitive Info');

print('Map value:', map.get(objKey));  

 
function* numberGenerator() {
    let num = 0;
    while (true) {
        yield num++;
    }
}

const generator = numberGenerator();
print(generator.next().value);  
print(generator.next().value);  

 
function sum(...args) {
    return args.reduce((acc, val) => acc + val, 0);
}

const nums = [1, 2, 3, 4];
print('Sum:', sum(...nums));  

 
const uniqueID = Symbol('id');
const anotherID = Symbol('id');

print(uniqueID === anotherID);  

 
class CustomArray extends Array {
    get [Symbol.toStringTag]() {
        return 'CustomArray';
    }
}

const arr = new CustomArray(1, 2, 3);
print(Object.prototype.toString.call(arr));  