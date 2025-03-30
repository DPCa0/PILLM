 

 
function* numberGenerator() {
    for (let i = 1; i <= 5; i++) {
        yield new Promise(resolve => setTimeout(() => resolve(i), 1000));
    }
}

 
async function processNumbers(gen) {
    for await (let number of gen) {
        print(`Processing number: ${number}`);
    }
}

 
const handler = {
    get: function(target, prop, receiver) {
        print(`Accessing property "${prop}"`);
        return Reflect.get(...arguments);
    }
};

const targetObject = {
    name: 'Advanced JavaScript',
    type: 'Example'
};

const proxyObject = new Proxy(targetObject, handler);

 
print(proxyObject.name);
print(proxyObject.type);

 
const gen = numberGenerator();
processNumbers(gen);
