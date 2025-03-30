 
class AdvancedCalculator {
    #history = [];

    constructor() {
         
        return new Proxy(this, {
            get(target, prop) {
                if (typeof target[prop] === 'function' && !prop.startsWith('#')) {
                    return (...args) => {
                        const result = target[prop](...args);
                        target.#logHistory(prop, args, result);
                        return result;
                    };
                }
                return target[prop];
            }
        });
    }

     
    add(a, b) {
        return a + b;
    }

     
    multiply(a, b) {
        return a * b;
    }

     
    #logHistory(method, args, result) {
        this.#history.push({ method, args, result });
    }

     
    *getHistory() {
        for (const entry of this.#history) {
            yield entry;
        }
    }
}

 
(async () => {
    const calculator = new AdvancedCalculator();
    const result1 = calculator.add(5, 10);
    const result2 = calculator.multiply(7, 3);
    
    print(`Result 1: ${result1}`);
    print(`Result 2: ${result2}`);

     
    const simulatedAsyncOp = new Promise((resolve) => setTimeout(() => resolve('Async Operation Complete'), 1000));
    const asyncMessage = await simulatedAsyncOp;
    print(asyncMessage);

     
    for (const { method, args, result } of calculator.getHistory()) {
        print(`Method: ${method}, Args: ${args}, Result: ${result}`);
    }
})();
