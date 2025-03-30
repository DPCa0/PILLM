 

 
function* fetchDataGenerator() {
    yield new Promise(resolve => setTimeout(() => resolve('Data Part 1'), 1000));
    yield new Promise(resolve => setTimeout(() => resolve('Data Part 2'), 1000));
    yield new Promise(resolve => setTimeout(() => resolve('Data Part 3'), 1000));
}

 
async function processData() {
    const generator = fetchDataGenerator();
    let result = generator.next();
    while (!result.done) {
        const data = await result.value;
        print(`Received: ${data}`);
        result = generator.next();
    }
    print('All data processed!');
}

 
const targetObject = { a: 1, b: 2 };
const handler = {
    get: (obj, prop) => {
        print(`Accessing property '${prop}'`);
        return obj[prop];
    },
    set: (obj, prop, value) => {
        print(`Setting property '${prop}' to '${value}'`);
        obj[prop] = value;
        return true;
    }
};

const proxyObject = new Proxy(targetObject, handler);

 
processData();

 
print(proxyObject.a);
proxyObject.b = 3;
print(proxyObject.b);
