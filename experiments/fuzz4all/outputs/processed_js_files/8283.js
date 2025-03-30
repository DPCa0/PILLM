 
(async () => {
    const { randomUUID } = await import('crypto');

     
    const targetObject = { message: "Hello, world!" };
    const handler = {
        get: (obj, prop) => {
            print(`Property '${prop}' accessed`);
            return prop in obj ? obj[prop] : `Property ${prop} not found`;
        },
        set: (obj, prop, value) => {
            print(`Property '${prop}' set to '${value}'`);
            obj[prop] = value;
            return true;
        }
    };
    const proxyObject = new Proxy(targetObject, handler);

     
    async function* asyncGenerator() {
        for (let i = 0; i < 5; i++) {
            yield new Promise(resolve => setTimeout(() => resolve(i), 1000));
        }
    }

     
    const array = [1, 2, 3, 4, 5];
    const doubledArray = array.map(x => x * 2).filter(x => x > 5);

     
    (async () => {
        print(`Random UUID: ${randomUUID()}`);
        for await (let num of asyncGenerator()) {
            print(`Async Generator yielded: ${num}`);
        }
    })();

     
    print(proxyObject.message);
    proxyObject.newProperty = "Advanced JavaScript";
    print(proxyObject.newProperty);
    print(doubledArray);
})();
