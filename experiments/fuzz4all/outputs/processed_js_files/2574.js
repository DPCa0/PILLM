 

 
function asyncOperation(duration) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Completed after ${duration}ms`);
        }, duration);
    });
}

 
async function* asyncGenerator() {
    const durations = [1000, 2000, 3000];
    for (const duration of durations) {
        yield await asyncOperation(duration);
    }
}

 
const handler = {
    get: (target, prop) => {
        print(`Accessing property '${prop}'`);
        return Reflect.get(target, prop);
    }
};
const proxiedAsyncGenerator = new Proxy(asyncGenerator, handler);

 
async function execute() {
    const generator = proxiedAsyncGenerator();
    for await (const result of generator) {
        print(result);
    }
}

execute();
