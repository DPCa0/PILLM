 

 
const handler = {
    get(target, property) {
        print(`Property "${property}" accessed on target object`);
        return target[property];
    }
};

const targetObject = { message: "Hello, world!", author: "ChatGPT" };
const proxyObject = new Proxy(targetObject, handler);

 
async function delayedLog() {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Delayed: ${proxyObject.message}`);
        }, 1000);
    });

    const result = await promise;
    print(result);
}

 
function* messageGenerator() {
    yield `Generator: ${proxyObject.message}`;
    yield `By: ${proxyObject.author}`;
}

 
delayedLog();

 
const gen = messageGenerator();
for (const msg of gen) {
    print(msg);
}
