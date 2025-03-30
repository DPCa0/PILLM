class AsyncCalculator {
    constructor() {
        this.value = 0;
    }

    async add(x) {
        this.value += await Promise.resolve(x);
        return this;
    }

    async subtract(x) {
        this.value -= await Promise.resolve(x);
        return this;
    }

    async multiply(x) {
        this.value *= await Promise.resolve(x);
        return this;
    }

    async divide(x) {
        if (x === 0) throw new Error("Division by zero");
        this.value /= await Promise.resolve(x);
        return this;
    }

    async execute(operations) {
        for (const op of operations) {
            await this[op.type](op.value);
        }
        return this.value;
    }

    static #privateMethod() {
        return "This is a private method!";
    }
}

 
(async function() {
    const operations = [
        { type: 'add', value: 10 },
        { type: 'multiply', value: 3 },
        { type: 'subtract', value: 5 },
        { type: 'divide', value: 2 }
    ];

    const calculator = new AsyncCalculator();
    const result = await calculator.execute(operations);
    print(`The result is: ${result}`);
    
     
    const privateAccessProxy = new Proxy(AsyncCalculator, {
        get(target, prop) {
            if (prop === 'getPrivateMessage') return target.#privateMethod;
            return target[prop];
        }
    });

    print(privateAccessProxy.getPrivateMessage());
})();
