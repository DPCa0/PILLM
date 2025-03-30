 
class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = "CustomError";
    }
}

 
const handler = {
    get: (target, property) => {
        if (property in target) {
            return target[property];
        } else {
            throw new CustomError(`Property '${property}' does not exist`);
        }
    }
};

 
(async () => {
    try {
         
        const obj = new Proxy({ a: 1, b: 2 }, handler);

         
        const { a, c = 3, ...rest } = obj;
        print(`Destructured values: a=${a}, c=${c}, rest=`, rest);

         
        const p1 = Promise.resolve(42);
        const p2 = new Promise((resolve) => setTimeout(() => resolve(100), 500));
        
        const [result1, result2] = await Promise.all([p1, p2]);
        print(`Promise results: ${result1}, ${result2}`);

         
        function* numberGenerator() {
            yield* [1, 2, 3];
        }
        const numbers = [...numberGenerator()];
        print(`Generated numbers: ${numbers}`);

         
        const symbolKey = Symbol('unique');
        obj[symbolKey] = 'SymbolValue';
        print(`Symbol property: ${obj[symbolKey]}`);

    } catch (error) {
        if (error instanceof CustomError) {
            console.error(`Custom error caught: ${error.message}`);
        } else {
            console.error(`Error: ${error.message}`);
        }
    }
})();
