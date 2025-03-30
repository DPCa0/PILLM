 
const target = { message: "Hello, world!" };
const handler = {
    get: (obj, prop) => {
        if (prop === 'message') {
            return Reflect.get(obj, prop).toUpperCase();
        }
        return Reflect.get(obj, prop);
    }
};

const proxy = new Proxy(target, handler);

async function* asyncGenerator() {
    yield Promise.resolve(1);
    yield Promise.resolve(2);
    yield Promise.resolve(3);
}

(async () => {
    try {
         
        for await (const num of asyncGenerator()) {
            print(`Processing number: ${num}`);
        }
        
        print(proxy.message);  

         
        const set = new Set([1, 2, 3, 4, 4, 5]);
        const doubledValues = Array.from(set).map(x => x * 2);

        const [first, ...rest] = doubledValues;  
        print(`First doubled value: ${first}`);
        print(`Rest doubled values: ${rest}`);

         
        const { randomUUID } = await import('crypto');
        print(`Generated UUID: ${randomUUID()}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
})();
