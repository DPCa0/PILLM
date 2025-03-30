class AdvancedFeatureExample {
    constructor() {
        this.greeting = 'Hello, world!';
    }

    async delayedGreeting() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.greeting);
            }, 1000);
        });
    }

    *numberGenerator(limit) {
        let num = 0;
        while (num < limit) {
            yield num++;
        }
    }

    async #privateAsyncMethod() {
        print('Inside private async method');
    }

    async run() {
        await this.#privateAsyncMethod();
        
         
        const greetingMessage = await this.delayedGreeting();
        print(greetingMessage);

         
        const numbers = this.numberGenerator(5);
        for (const number of numbers) {
            print(`Generated number: ${number}`);
        }

         
        const targetObject = { foo: 'bar' };
        const handler = {
            get: function (obj, prop) {
                return prop in obj ? obj[prop] : `Property ${prop} doesn't exist.`;
            },
        };
        const proxy = new Proxy(targetObject, handler);
        print(proxy.foo); // bar
        print(proxy.unknownProperty); // Property unknownProperty doesn't exist.
    }
}

const example = new AdvancedFeatureExample();
example.run();
