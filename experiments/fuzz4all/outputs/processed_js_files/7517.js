 

 
const handler = {
    get(target, prop) {
        print(`Getting ${prop}`);
        return target[prop];
    },
    set(target, prop, value) {
        print(`Setting ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

const targetObject = { message: "Hello" };
const proxyObject = new Proxy(targetObject, handler);

 
async function asyncOperation() {
    print(proxyObject.message);
    proxyObject.message = "Hello, Proxy!";

    const promise = new Promise((resolve) => setTimeout(() => resolve("Async and Await!"), 2000));
    print(await promise);
}

 
function* generatorFunction() {
    yield "Starting Generator";
    yield* delegateGenerator();
    yield "Ending Generator";
}

function* delegateGenerator() {
    proxyObject.message = "Yielding from Delegate";
    yield proxyObject.message;
}

 
(async function run() {
    await asyncOperation();

    const gen = generatorFunction();
    for (const value of gen) {
        print(value);
    }
})();
