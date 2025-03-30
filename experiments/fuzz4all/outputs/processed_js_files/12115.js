 

 
const asyncOperation = (value, delay) => 
    new Promise(resolve => setTimeout(() => resolve(value), delay));

 
function* numberGenerator() {
    let i = 0;
    while (i < 3) {
        yield asyncOperation(i++, 1000);
    }
}

 
async function processNumbers() {
    const numbers = numberGenerator();
    for await (const num of numbers) {
        print(`Processed number: ${num}`);
    }
}

 
const targetObj = {
    message: "Hello",
    count: 0
};

const handler = {
    get: (obj, prop) => {
        print(`Property '${prop}' accessed`);
        return obj[prop];
    },
    set: (obj, prop, value) => {
        print(`Property '${prop}' set to '${value}'`);
        obj[prop] = value;
        return true;
    }
};

const proxyObj = new Proxy(targetObj, handler);

 
async function main() {
     
    print(proxyObj.message);
    proxyObj.count = 42;
    
     
    await processNumbers();
}

main();
