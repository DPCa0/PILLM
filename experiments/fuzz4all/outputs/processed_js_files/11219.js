 

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function* asyncGenerator() {
    const data = [1, 2, 3, 4, 5];
    for (const num of data) {
        await delay(100);
        yield num * 2;
    }
}

 
async function processGenerator() {
    const results = [];
    for await (const value of asyncGenerator()) {
        results.push(value);
    }
    return results;
}

 
const handler = {
    get(target, prop, receiver) {
        print(`Getting property: ${prop}`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
        print(`Setting property: ${prop} to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

 
const targetObject = {
    hello: "world",
    foo: "bar"
};

 
const proxy = new Proxy(targetObject, handler);

 
async function demonstrateProxyAndAsync() {
     
    print(proxy.hello);
    proxy.newProp = "newValue";
    print(proxy.newProp);

     
    const result = await processGenerator();
    print('Processed Generator Results:', result);
}

 
demonstrateProxyAndAsync();
