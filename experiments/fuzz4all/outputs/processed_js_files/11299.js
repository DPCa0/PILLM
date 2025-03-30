 

 
const handler = {
    get(target, prop, receiver) {
        if (typeof target[prop] === 'function') {
            return function (...args) {
                print(`Calling ${prop} with arguments: ${args}`);
                return Reflect.apply(target[prop], target, args);
            };
        }
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

 
const obj = {
    async delayedAddition(a, b) {
        return new Promise(resolve => setTimeout(() => resolve(a + b), 1000));
    },
    x: 10,
    y: 20
};

 
const proxiedObj = new Proxy(obj, handler);

 
async function useProxy() {
    try {
         
        print(`Initial x: ${proxiedObj.x}`);
        
         
        proxiedObj.x = 15;
        
         
        const result = await proxiedObj.delayedAddition(proxiedObj.x, proxiedObj.y);
        print(`Result of delayed addition: ${result}`);
    } catch (error) {
        console.error('Error:', error);
    }
}

 
useProxy();
