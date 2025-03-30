 

 
function* generatePromises() {
    yield new Promise((resolve) => setTimeout(() => resolve(1), 1000));
    yield new Promise((resolve) => setTimeout(() => resolve(2), 1000));
    yield new Promise((resolve) => setTimeout(() => resolve(3), 1000));
}

 
async function consumeGenerator(gen) {
    for (const promise of gen) {
        print('Resolved:', await promise);
    }
}

 
const handler = {
    get(target, prop, receiver) {
        print(`Getting property: ${prop}`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
        print(`Setting property: ${prop} to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

const obj = new Proxy({ x: 10, y: 20 }, handler);

print(obj.x);
obj.y = 30;
print(obj.y);

 
consumeGenerator(generatePromises());
