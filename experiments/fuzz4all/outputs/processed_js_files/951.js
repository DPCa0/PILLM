 

 
function* generateData() {
    yield Promise.resolve(1);
    yield Promise.resolve(2);
    yield Promise.resolve(3);
}

 
async function processData(generator) {
    for await (let promise of generator) {
        print(`Processed value: ${await promise}`);
    }
}

 
const handler = {
    get: (target, prop, receiver) => {
        if (prop in target) {
            print(`Accessing property "${prop}"`);
            return Reflect.get(target, prop, receiver);
        } else {
            return `Property "${prop}" not found`;
        }
    },
    set: (target, prop, value) => {
        print(`Setting property "${prop}" to ${value}`);
        target[prop] = value * 2;  
        return true;
    }
};

const originalData = { a: 10, b: 20 };
const proxyData = new Proxy(originalData, handler);

(async () => {
     
    await processData(generateData());
    
     
    print(proxyData.a);  
    proxyData.b = 15;  
    print(proxyData.b);  
    print(proxyData.c);  
})();
