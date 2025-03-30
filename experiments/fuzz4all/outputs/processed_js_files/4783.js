 

 
function simulateAsyncOperation(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.2 ? resolve(`Processed: ${data}`) : reject('Failed to process data');
        }, 1000);
    });
}

 
function* dataGenerator() {
    yield 'Data 1';
    yield 'Data 2';
    yield 'Data 3';
}

 
async function processData() {
    const generator = dataGenerator();

    for (const data of generator) {
        try {
            const result = await simulateAsyncOperation(data);
            print(result);
        } catch (error) {
            console.error(error);
        }
    }
}

 
const handler = {
    get: (target, property) => {
        print(`Property '${property}' accessed with value: ${target[property]}`);
        return target[property];
    },
    set: (target, property, value) => {
        print(`Property '${property}' set to value: ${value}`);
        target[property] = value;
        return true;
    }
};

const targetObject = { a: 10, b: 20 };
const proxy = new Proxy(targetObject, handler);

processData();   

 
proxy.a;       
proxy.b = 30;  
print(proxy.b);   
