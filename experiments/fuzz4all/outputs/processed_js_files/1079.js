 

 
const randomDelay = () => new Promise(resolve => setTimeout(resolve, Math.random() * 2000));

 
function* numberGenerator() {
    while (true) {
        yield Math.floor(Math.random() * 100);
    }
}

 
const loggingHandler = {
    get(target, property) {
        print(`Getting property ${property}`);
        return target[property];
    },
    set(target, property, value) {
        print(`Setting property ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

 
const target = { message: "Hello, Proxy!" };
const proxy = new Proxy(target, loggingHandler);

 
const processNumbers = async (gen, proxiedObject) => {
    for (let i = 0; i < 5; i++) {
        await randomDelay();
        const number = gen.next().value;
        print(`Generated number: ${number}`);
        proxiedObject.message = `Random number is ${number}`;
        print(proxiedObject.message);
    }
};

const gen = numberGenerator();
processNumbers(gen, proxy);
