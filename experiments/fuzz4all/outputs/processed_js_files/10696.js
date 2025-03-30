 
const handler = {
    set(target, property, value) {
        if (property === 'name' && typeof value === 'string') {
            print(`Name changed from ${target[property]} to ${value}`);
            target[property] = value;
            return true;
        }
        return false;
    }
};

const person = new Proxy({ name: 'John' }, handler);

 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        let data = await response.json();
        print('Fetched Data:', data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

 
(async () => {
    const moduleSpecifier = './someModule.js';  
    try {
        const { someFunction } = await import(moduleSpecifier);
        someFunction();
    } catch (error) {
        console.error('Module Import Error:', error);
    }
})();

 
const _privateData = Symbol('privateData');
class MyClass {
    constructor() {
        this[_privateData] = 'Secret Info';
    }
    
    getPrivateData() {
        return this[_privateData];
    }
}

const myInstance = new MyClass();
print('Private Data:', myInstance.getPrivateData());

 
const complexObject = {
    a: {
        b: 1,
        c: 2,
        d: 3
    },
    e: 4
};

const { a: { b, ...rest }, e } = complexObject;
print('Destructured:', b, rest, e);

 
function tag(strings, ...values) {
    return strings.raw.reduce((acc, str, i) => `${acc}${str}${values[i] || ''}`, '');
}

const userName = 'Alice';
const message = tag`Hello, ${userName}, welcome to our platform!\nHave a nice day!`;
print('Tagged Template:', message);

 
const map = new Map();
map.set('key1', 'value1');
map.set('key2', 'value2');
print('Map:', map);

const set = new Set([1,