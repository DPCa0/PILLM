 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncGenerator = async function* () {
    for (let i = 0; i < 3; i++) {
        await delay(1000);
        yield `Value ${i}`;
    }
};

const proxyHandler = {
    get(target, prop) {
        if (prop in target) {
            print(`Accessing property ${prop}`);
            return target[prop];
        } else {
            return `Property ${prop} doesn't exist`;
        }
    },
    set(target, prop, value) {
        print(`Setting property ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

const obj = { a: 1, b: 2 };
const proxiedObj = new Proxy(obj, proxyHandler);

(async () => {
    print("Starting async generator:");
    for await (let value of asyncGenerator()) {
        print(value);
    }
    
    print("Using Proxy object:");
    print(proxiedObj.a);
    proxiedObj.c = 3;
    print(proxiedObj.c);
    print(proxiedObj.nonExistent);
})();
