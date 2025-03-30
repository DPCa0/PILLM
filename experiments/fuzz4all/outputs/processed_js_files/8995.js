 

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
function* numberGenerator() {
    let num = 1;
    while(true) {
        yield num++;
    }
}

 
async function fetchValues(gen, numValues) {
    for(let i = 0; i < numValues; i++) {
        await delay(500);
        print(`Value: ${gen.next().value}`);
    }
}

 
const handler = {
    get(target, prop, receiver) {
        print(`Getting property '${prop}'`);
        return Reflect.get(...arguments);
    },
    set(target, prop, value, receiver) {
        print(`Setting property '${prop}' to ${value}`);
        return Reflect.set(...arguments);
    }
};

const target = { a: 1, b: 2 };
const proxy = new Proxy(target, handler);

 
print(proxy.a);
proxy.b = 42;
print(proxy.b);

 
const gen = numberGenerator();
fetchValues(gen, 5);
