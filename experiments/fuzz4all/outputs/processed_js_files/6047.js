 

 
const asyncOperation = async (item) => {
    return new Promise(resolve => {
        setTimeout(() => resolve(item * 2), 500);
    });
};

 
function* generatePromises() {
    for (let i = 1; i <= 5; i++) {
        yield asyncOperation(i);
    }
}

 
async function processGenerator(gen) {
    for (const promise of gen) {
        const result = await promise;
        print(`Processed: ${result}`);
    }
}

 
const handler = {
    get: (target, prop) => {
        if (prop in target) {
            return target[prop];
        } else {
            console.warn(`Property '${prop}' does not exist.`);
        }
    },
    set: (target, prop, value) => {
        print(`Setting ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

 
const data = { a: 1, b: 2 };
const proxyData = new Proxy(data, handler);

 
proxyData.a = 10;
print(proxyData.a);
print(proxyData.c);  

 
processGenerator(generatePromises());
