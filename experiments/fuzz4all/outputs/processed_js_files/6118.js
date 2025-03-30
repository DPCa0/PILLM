 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
function* messageGenerator() {
    yield "Hello";
    yield "world";
    yield "from";
    yield "JavaScript!";
}

 
async function processMessages(generator) {
    for (const message of generator) {
        print(message);
        await delay(500);  
    }
}

 
const handler = {
    get: (target, property) => {
        if (property === 'greet') {
            return 'Greetings from the Proxy!';
        }
        return target[property];
    }
};

 
const targetObject = {
    greet: 'Hello, world!',
    farewell: 'Goodbye, world!'
};

 
const proxy = new Proxy(targetObject, handler);

 
(async () => {
    print(proxy.greet);  
    print(proxy.farewell);  
    const generator = messageGenerator();
    await processMessages(generator);
})();
