(async () => {
     

     
    const handler = {
        get: (target, property) => {
            print(`Getting ${property}`);
            return target[property];
        },
        set: (target, property, value) => {
            print(`Setting ${property} to ${value}`);
            target[property] = value;
            return true;
        }
    };

    const data = { message: 'Hello, world!', count: 0 };
    const proxyData = new Proxy(data, handler);

     
    function* messageGenerator() {
        while (proxyData.count < 5) {
            yield proxyData.message;
            proxyData.count++;
        }
    }

     
    const doubleCount = () => new Promise((resolve) => {
        setTimeout(() => {
            proxyData.count *= 2;
            resolve(proxyData.count);
        }, 1000);
    });

     
    async function processMessages() {
        const generator = messageGenerator();
        let result = generator.next();
        
        while (!result.done) {
            print(result.value);
            result = generator.next();
        }

        print('Doubling count asynchronously...');
        const finalCount = await doubleCount();
        print(`Final count: ${finalCount}`);
    }

    await processMessages();
})();
