 

 
function* valueGenerator() {
    let value = 0;
    while (true) {
        yield new Promise(resolve => setTimeout(() => resolve(value++), 1000));
    }
}

 
async function consumeGenerator(generator) {
    const iterator = generator();
    for (let i = 0; i < 5; i++) {
        const promise = iterator.next().value;
        print(`Awaiting promise ${i}`);
        const result = await promise;
        print(`Result: ${result}`);
    }
}

 
const target = {
    message: "Hello",
    number: 42
};

const handler = {
    get: (obj, prop) => {
        print(`Getting ${prop}`);
        return obj[prop];
    },
    set: (obj, prop, value) => {
        print(`Setting ${prop} to ${value}`);
        obj[prop] = value;
        return true;
    }
};

const proxy = new Proxy(target, handler);

 
(async () => {
    print(proxy.message);
    proxy.message = "Hello, world!";
    print(proxy.number);

    await consumeGenerator(valueGenerator);
})();
