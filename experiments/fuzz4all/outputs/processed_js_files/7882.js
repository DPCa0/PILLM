(async () => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

     
    const loggerProxy = new Proxy({}, {
        get: (target, prop) => {
            print(`Accessing ${prop}`);
            return target[prop];
        },
        set: (target, prop, value) => {
            print(`Setting ${prop} to ${value}`);
            target[prop] = value;
            return true;
        }
    });

    loggerProxy.message = "Hello, world!";
    
     
    function* characterGenerator(message) {
        for (const char of message) {
            yield char;
        }
    }

    const gen = characterGenerator(loggerProxy.message);

    print("Starting message display...");

     
    for await (const char of {
        [Symbol.asyncIterator]: () => ({
            next: () => delay(100).then(() => {
                const { value, done } = gen.next();
                return { value, done };
            })
        })
    }) {
        process.stdout.write(char);
    }
    
    print("\nMessage display complete!");
})();
