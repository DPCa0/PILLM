 

 
const handler = {
    get(target, prop, receiver) {
        print(`Getting property ${prop}`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
        print(`Setting property ${prop} to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

const targetObject = { name: 'JavaScript', version: 'ES2023' };
const proxyObject = new Proxy(targetObject, handler);

 
function* numberGenerator() {
    for (let i = 0; i < 5; i++) {
        yield new Promise(resolve => setTimeout(() => resolve(i), 1000));
    }
}

 
async function processNumbers(gen) {
    for await (let num of gen) {
        print(`Processed number: ${num}`);
    }
}

 
proxyObject.name = 'Advanced JavaScript';
print(proxyObject.name);

const gen = numberGenerator();
processNumbers(gen);
