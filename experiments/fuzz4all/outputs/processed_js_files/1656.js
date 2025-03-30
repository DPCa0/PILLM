 
async function* fetchData(urls) {
    for (const url of urls) {
        yield fetch(url).then(response => response.json());
    }
}

 
const handler = {
    get: (target, prop) => {
        if (prop in target) {
            return target[prop];
        } else {
            print(`Property "${prop}" does not exist.`);
            return undefined;
        }
    },
    set: (target, prop, value) => {
        if (typeof value === 'number') {
            target[prop] = value;
            return true;
        } else {
            print(`Property "${prop}" can only be set to a number.`);
            return false;
        }
    }
};

const targetObject = { id: 1, score: 100 };
const proxy = new Proxy(targetObject, handler);

 
const privateData = new WeakMap();

class User {
    constructor(name) {
        privateData.set(this, { name });
    }
    
    getName() {
        return privateData.get(this).name;
    }
}

 
const uniqueSymbol = Symbol('unique');

const advancedObject = {
    [uniqueSymbol]: 'This is a unique property',
    display() {
        print(this[uniqueSymbol]);
    }
};

 
(async () => {
    const urls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2'];
    
    for await (const data of fetchData(urls)) {
        print(data);
    }
    
    proxy.id = 2;  
    proxy.score = 'high';  
    
    const user = new User('Alice');
    print(user.getName());
    
    advancedObject.display();
})();
