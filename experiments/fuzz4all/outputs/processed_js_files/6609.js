(async () => {
     
    const handler = {
        get: (target, prop) => prop in target ? target[prop] : `Property ${prop} doesn't exist`,
    };

    const target = { greet: 'Hello', name: 'World' };
    const proxy = new Proxy(target, handler);

    // Using Symbol to create a unique key
    const uniqueKey = Symbol('uniqueKey');

    // Using WeakMap for private data storage
    const privateData = new WeakMap();

    class Greeter {
        constructor() {
            privateData.set(this, { [uniqueKey]: '!' });
        }
        // Using template literals and tagged templates
        formatMessage(strings, ...values) {
            return strings.reduce((prev, curr, i) => prev + curr + (values[i] || ''), '');
        }
         
        async greet() {
            const message = await this.getMessage();
            print(this.formatMessage`${message}${privateData.get(this)[uniqueKey]}`);
        }
        getMessage() {
            return new Promise(resolve => {
                setTimeout(() => resolve(`${proxy.greet}, ${proxy.name}`), 1000);
            });
        }
    }

    const greeter = new Greeter();
    greeter.greet();  

     
    function* sequenceGenerator(start, end) {
        for (let i = start; i <= end; i++) {
            yield i;
        }
    }

    for (const num of sequenceGenerator(1, 5)) {
        print(num);  
    }
})();
