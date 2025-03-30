 
const EventEmitter = require('events');

 
const handler = {
    get: function(target, prop) {
        if (prop in target) {
            return target[prop];
        } else {
            print(`Property "${prop}" doesn't exist, generating it dynamically.`);
            return `Dynamic Value for "${prop}"`;
        }
    }
};

const dynamicObj = new Proxy({}, handler);

// Using async/await with a Promise to simulate asynchronous operations
async function fetchData() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Fetched Data");
        }, 1000);
    });
}

async function main() {
    print(dynamicObj.existingProp = "Existing Value");
    print(dynamicObj.nonExistingProp);
    
    const data = await fetchData();
    print(data);
    
    // Demonstrate use of Map and Set with advanced functions
    const map = new Map();
    map.set('key1', 'value1');
    
    const set = new Set();
    set.add('value1');
    set.add('value2');
    
    // Using a WeakMap to hold private data
    const privateData = new WeakMap();
    class Secret {
        constructor(secret) {
            privateData.set(this, secret);
        }
        getSecret() {
            return privateData.get(this);
        }
    }
    
    const secretInstance = new Secret("My Secret");
    print(secretInstance.getSecret());

    // Event-driven programming using EventEmitter
    const eventEmitter = new EventEmitter();

    eventEmitter.on('greet', name => {
        print(`Hello, ${name}!`);
    });

    eventEmitter.emit('greet', 'World');
}

main();
