 

 
const fibonacciAsync = {
    [Symbol.asyncIterator]: async function* (limit) {
        let [prev, curr] = [0, 1];
        for (let i = 0; i < limit; i++) {
            await new Promise(resolve => setTimeout(resolve, 100));  
            [prev, curr] = [curr, prev + curr];
            yield curr;
        }
    }
};

 
const methodLogger = (obj) => {
    return new Proxy(obj, {
        get(target, property) {
            const origMethod = target[property];
            if (typeof origMethod === 'function') {
                return function (...args) {
                    print(`Called ${property} with arguments: ${JSON.stringify(args)}`);
                    return origMethod.apply(target, args);
                };
            }
            return origMethod;
        }
    });
};

 
class AdvancedOperations {
    #secretMultiplier = 5;

    constructor() {
        this.operations = {
            add: (a, b) => a + b,
            multiply: (a, b) => a * b
        };
    }

     
    async loadAndUseLodash() {
        const _ = await import('lodash');
        const numbers = [1, 2, 3, 4, 5];
        print('Lodash sum:', _.sum(numbers));
    }

     
    execute(operation, ...args) {
        if (typeof this.operations[operation] !== 'function') {
            throw new Error('Operation not supported');
        }
        return this.operations[operation](...args);
    }

     
    calculateWithSecret(n) {
        return n * this.#secretMultiplier;
    }
}

 
(async () => {
    print('Fibonacci Numbers:');
    for await (const num of fibonacciAsync[Symbol.asyncIterator](10)) {
        print(num);
    }

    const operations = new AdvancedOperations();
    const loggedOperations = methodLogger(operations);
    
    try {
        print('Add 5 + 3:', loggedOperations.execute('add', 5, 3));
        console.log