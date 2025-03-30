 
async function* asyncGenerator() {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    
    yield await delay(1000).then(() => 1);
    yield await delay(1000).then(() => 2);
    yield await delay(1000).then(() => 3);
}

const targetObject = {
    prop1: 42,
    prop2: 'Hello, Proxy!'
};

const handler = {
    get: (target, prop, receiver) => {
        if (prop in target) {
            print(`Accessed property: ${prop}`);
            return Reflect.get(target, prop, receiver);
        } else {
            print(`Property ${prop} does not exist.`);
            return undefined;
        }
    }
};

const proxy = new Proxy(targetObject, handler);

(async () => {
    for await (const num of asyncGenerator()) {
        print(`Generated: ${num}`);
    }
    
    print(proxy.prop1);  
    print(proxy.prop3);  
})();
