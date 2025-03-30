 

 
const asyncOperation = (value, delay) => new Promise(resolve => setTimeout(() => resolve(value), delay));

 
async function* generateAsyncSequence() {
    for (let i = 0; i < 5; i++) {
         
        yield await asyncOperation(`Value: ${i}`, Math.random() * 1000);
    }
}

 
async function processSequence() {
    const results = [];
    for await (const value of generateAsyncSequence()) {
        print(value);
        results.push(value);
    }
    return results;
}

 
const handler = {
    get(target, propKey) {
        print(`Getting property: ${propKey}`);
        return target[propKey];
    },
    set(target, propKey, value) {
        print(`Setting property: ${propKey} to ${value}`);
        target[propKey] = value;
        return true;
    }
};

const targetObject = { a: 1, b: 2 };
const proxyObject = new Proxy(targetObject, handler);

async function main() {
    await processSequence();
    
     
    print(proxyObject.a);
    proxyObject.b = 42;
    print(proxyObject.b);
}

main();
