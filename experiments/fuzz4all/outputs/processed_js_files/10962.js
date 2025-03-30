 
(async () => {
    const { promises: fs } = await import('fs');

     
    const handler = {
        get: (target, prop) => {
            print(`Accessed property: ${prop}`);
            return Reflect.get(target, prop);
        }
    };

     
    const uniqueProp = Symbol('unique');

    const config = new Proxy({
        [uniqueProp]: 'I am unique',
        message: 'Hello, world!',
        logPath: './log.txt'
    }, handler);

     
    function* taskFlow() {
        yield config.message;
        yield* (async function* () {
            try {
                await fs.writeFile(config.logPath, config.message);
                yield `Message written to ${config.logPath}`;
            } catch (err) {
                yield `Error: ${err.message}`;
            }
        })();
    }

     
    const iterator = taskFlow();
    for await (const step of iterator) {
        print(step);
    }

     
    const privateData = new WeakMap();
    class MyClass {
        constructor(secret) {
            privateData.set(this, secret);
        }
        revealSecret() {
            return privateData.get(this);
        }
    }

    const instance = new MyClass('This is a secret.');
    print(instance.revealSecret());
})();
