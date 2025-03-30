 

 
async function* asyncNumberGenerator(limit) {
    for (let i = 1; i <= limit; i++) {
        await new Promise(resolve => setTimeout(resolve, 100));  
        yield i;
    }
}

 
const handler = {
    get(target, prop) {
        if (prop === 'message') {
            return () => `You've accessed a message at ${new Date()}`;
        }
        return target[prop];
    }
};

const target = { greeting: 'Hello', name: 'World' };
const proxiedObject = new Proxy(target, handler);

(async function() {
    const message = proxiedObject.message();  
    print(message);

    print(`Fetching numbers asynchronously:`);
    for await (const num of asyncNumberGenerator(5)) {
        print(num);
    }

    print(`Complete message: ${proxiedObject.greeting}, ${proxiedObject.name}!`);
})();
