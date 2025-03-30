 
class AdvancedCalculator {
     
    #history = [];

     
    static #operate(a, b, operation) {
        switch (operation) {
            case 'add': return a + b;
            case 'subtract': return a - b;
            case 'multiply': return a * b;
            case 'divide': return b !== 0 ? a / b : 'Error: Division by zero';
            default: throw new Error('Unknown operation');
        }
    }

     
    async calculate(a, b, operation) {
        return new Promise((resolve) => {
            const result = AdvancedCalculator.#operate(a, b, operation);
            this.#history.push({ a, b, operation, result });
            resolve(result);
        });
    }

     
    get history() {
        return [...this.#history];
    }
}

 
const calculatorProxy = new Proxy(new AdvancedCalculator(), {
    get(target, prop) {
        if (prop === 'history') {
            print('Accessing calculation history...');
        }
        return target[prop];
    }
});

 
(async () => {
     
    print(await calculatorProxy.calculate(10, 5, 'add'));
    print(await calculatorProxy.calculate(15, 3, 'subtract'));
    print(await calculatorProxy.calculate(4, 7, 'multiply'));

     
    print(calculatorProxy.history);

     
    const { format } = await import('util');
    print(format('Formatted output: %j', calculatorProxy.history));
})();
