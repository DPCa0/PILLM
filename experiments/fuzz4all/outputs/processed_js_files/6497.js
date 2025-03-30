 

 
const target = {
    message1: "Hello",
    message2: "World"
};

 
const handler = {
    get: (obj, prop) => {
        if (prop in obj) {
            return obj[prop];
        } else {
            throw new ReferenceError(`Property "${prop}" does not exist.`);
        }
    }
};

 
const proxy = new Proxy(target, handler);

 
async function* asyncGenerator() {
    const promise1 = new Promise((resolve) => setTimeout(() => resolve(proxy.message1), 1000));
    const promise2 = new Promise((resolve) => setTimeout(() => resolve(proxy.message2), 1000));
    yield await promise1;
    yield await promise2;
}

 
async function fetchMessages() {
    const gen = asyncGenerator();
    for await (const message of gen) {
        print(message);
    }
}

 
fetchMessages()
    .then(() => console.log('Done'))
    .catch(error => console.error(error.message));
