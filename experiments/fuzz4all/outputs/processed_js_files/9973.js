 

 
const secret = Symbol('secret');

 
const handler = {
    get: (target, prop) => {
        if (prop === secret) {
            return target[prop];
        }
        if (prop in target) {
            print(`Getting property "${prop}"`);
            return target[prop];
        } else {
            return `Property "${prop}" not found`;
        }
    },
    set: (target, prop, value) => {
        if (prop === 'immutable') {
            throw new Error(`Cannot modify immutable property`);
        }
        print(`Setting property "${prop}" to "${value}"`);
        target[prop] = value;
        return true;
    }
};

 
async function* asyncGenerator() {
    let i = 1;
    while (i <= 3) {
        yield await Promise.resolve(i++);
    }
}

 
const targetObject = {
    name: 'Advanced JavaScript',
    version: 1.0,
    [secret]: 'This is a secret value'
};

 
const proxyObject = new Proxy(targetObject, handler);

 
async function demo() {
    print(proxyObject.name);  
    print(proxyObject.nonExistent);  

    proxyObject.version = 2.0;  
     

    for await (const value of asyncGenerator()) {
        print(`Async generator yielded: ${value}`);
    }

     
    print(`Secret: ${proxyObject[secret]}`);
}

demo();
