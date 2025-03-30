 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
function* numberGenerator() {
    let num = 1;
    while (true) {
        yield delay(1000).then(() => num++);
    }
}

 
async function consumeGenerator(gen) {
    const iterationLimit = 5;
    for (let i = 0; i < iterationLimit; i++) {
        const value = await gen.next().value;
        print(`Generated Number: ${value}`);
    }
}

 
const handler = {
    get: (target, property) => {
        if (property in target) {
            print(`Property '${property}' accessed.`);
            return target[property];
        } else {
            print(`Property '${property}' not found.`);
            return undefined;
        }
    },
    set: (target, property, value) => {
        print(`Property '${property}' set to ${value}.`);
        target[property] = value;
        return true;
    }
};

 
const targetObject = {
    firstName: 'John',
    lastName: 'Doe'
};

 
const proxy = new Proxy(targetObject, handler);

 
print(proxy.firstName);
proxy.firstName = 'Jane';
print(proxy.firstName);
print(proxy.middleName);

 
const gen = numberGenerator();
consumeGenerator(gen);
