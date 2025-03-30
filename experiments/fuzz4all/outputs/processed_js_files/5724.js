 

 
const handler = {
    get: (target, property) => {
        if (property in target) {
            return target[property];
        }
        return `Property '${property}' does not exist!`;
    },
    set: (target, property, value) => {
        if (typeof value === 'number') {
            target[property] = value;
            return true;
        } else {
            console.warn(`Cannot set non-number value to property '${property}'`);
            return false;
        }
    }
};

const data = new Proxy({}, handler);

 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ x: 42, y: 27 });
        }, 1000);
    });
}

 
function* dataGenerator() {
    const data = yield fetchData();
    yield process(data);
}

function process({ x, y }) {
    return x + y;
}

 
const generator = dataGenerator();

 
async function run() {
    let result = generator.next();
    while (!result.done) {
        if (result.value instanceof Promise) {
            const resolvedData = await result.value;
            result = generator.next(resolvedData);
        } else {
            result = generator.next();
        }
    }

    const sum = result.value;
    print(`Sum of fetched data: ${sum}`);
    
     
    data.x = sum;
    print(`Proxy x: ${data.x}`);   
    print(`Proxy z: ${data.z}`);   
    data.y = "hello";                     
}

run();
