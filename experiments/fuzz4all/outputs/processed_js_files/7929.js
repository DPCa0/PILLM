 

 
const handler = {
    get: (target, prop, receiver) => {
        if (typeof prop === 'symbol') {
            return target[Symbol.for('default')];
        }
        return Reflect.get(target, prop, receiver);
    }
};

 
const targetObject = {
    [Symbol.for('default')]: 'This is the default symbol property'
};

const proxy = new Proxy(targetObject, handler);

 
function* idGenerator() {
    let id = 0;
    while (true) {
        yield id++;
    }
}

 
async function asyncOperation(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Resolved async operation with ID: ${id}`);
        }, 1000);
    });
}

 
async function main() {
    const ids = idGenerator();

    for (let i = 0; i < 3; i++) {
        const id = ids.next().value;
        print(`Starting async operation ${id}`);
        
        const result = await asyncOperation(id);
        print(result);
        
        print(`Accessing proxy with Symbol: ${proxy[Symbol('something')]}`);
    }
}

main();
