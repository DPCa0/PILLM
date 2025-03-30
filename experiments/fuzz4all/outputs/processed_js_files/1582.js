 

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function* asyncNumberGenerator(limit) {
    for (let i = 0; i < limit; i++) {
        await delay(100);  
        yield i;
    }
}

async function processNumbers() {
    for await (const num of asyncNumberGenerator(5)) {
        print(`Number: ${num}`);
    }
}

const handler = {
    get: (obj, prop) => {
        if (prop in obj) {
            print(`Accessing property: ${prop}`);
            return obj[prop];
        } else {
            throw new ReferenceError(`Property ${prop} does not exist.`);
        }
    },
    set: (obj, prop, value) => {
        if (typeof value === 'number' && value > 0) {
            print(`Setting property: ${prop} to ${value}`);
            obj[prop] = value;
            return true;
        }
        throw new TypeError('Value must be a positive number.');
    }
};

const targetObject = {
    count: 0
};

const proxiedObject = new Proxy(targetObject, handler);

proxiedObject.count = 10;    
try {
    proxiedObject.invalidProp = 15;  
} catch (error) {
    console.error(error.message);
}

try {
    print(proxiedObject.nonExistentProp);  
} catch (error) {
    console.error(error.message);
}

processNumbers().then(() => print('Done processing numbers!'));

