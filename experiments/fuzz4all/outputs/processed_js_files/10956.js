 

 
const asyncOperation = async (value) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Processed: ${value}`);
        }, 1000);
    });
};

 
function* promiseGenerator() {
    yield asyncOperation("Value 1");
    yield asyncOperation("Value 2");
    yield asyncOperation("Value 3");
}

 
const handler = {
    get: (target, prop) => {
        print(`Accessing property ${prop}`);
        return target[prop];
    }
};

 
const targetObject = {
    data: "Important Data"
};

 
const proxy = new Proxy(targetObject, handler);

 
async function processPromises() {
    const gen = promiseGenerator();
    for (const promise of gen) {
        print(await promise);
    }
    print(proxy.data);  
}

 
processPromises();
