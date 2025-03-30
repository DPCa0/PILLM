(async () => {
     
    const targetObject = { message: 'Hello, World!' };
    const handler = {
        get: (obj, prop) => {
            print(`Getting property ${prop}`);
            return obj[prop];
        },
        set: (obj, prop, value) => {
            print(`Setting property ${prop} to ${value}`);
            obj[prop] = value;
            return true;
        }
    };
    const proxy = new Proxy(targetObject, handler);
    
     
    function* messageGenerator() {
        yield proxy.message;
        yield 'Hello, Universe!';
    }

     
    async function delayedLog(message) {
        const promise = new Promise((resolve) => setTimeout(resolve, 1000, message));
        print(await promise);
    }

     
    await Promise.all(
        Array.from(messageGenerator()).map(async (msg, index) => {
            proxy.message = `Message ${index + 1}`;
            await delayedLog(msg);
        })
    );

     
    function combineMessages(...messages) {
        print('Combined Messages:', ...messages);
    }
    combineMessages('Hello', 'Proxy', 'Async', 'Generators');
})();
