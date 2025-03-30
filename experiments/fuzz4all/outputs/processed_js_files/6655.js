 
const handler = {
    get(target, prop, receiver) {
        if (prop === 'secret') {
            return `Sorry, you can't access '${prop}' property.`;
        }
        return Reflect.get(...arguments);
    },
    set(target, prop, value) {
        if (typeof value === 'number' && value < 0) {
            throw new Error('Value cannot be negative');
        }
        return Reflect.set(...arguments);
    }
};

// Target object
const targetObject = {
    name: 'Advanced JavaScript',
    value: 42,
    secret: 'hidden'
};

// Proxy with traps
const proxyObject = new Proxy(targetObject, handler);

// Use of Proxy
print(proxyObject.name); // Output: Advanced JavaScript
print(proxyObject.secret); // Output: Sorry, you can't access 'secret' property.

try {
    proxyObject.value = -10;  
} catch (e) {
    console.error(e.message);  
}

 
async function asyncFunction() {
    print('Start Async Operation');

    const delayedPromise = new Promise((resolve) => {
        setTimeout(() => resolve('Async Result'), 1000);
    });

    const result = await delayedPromise;
    print(result);  

    print('End Async Operation');
}

 
asyncFunction();

 
async function* asyncGenerator() {
    yield await Promise.resolve('Yielded Value 1');
    yield await Promise.resolve('Yielded Value 2');
}

(async () => {
    for await (const value of asyncGenerator()) {
        print(value);
    }
})();

 
 
 
 
 
 
