class AsyncCalculator {
    #history = [];
    
    constructor() {
        this.operations = {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
            '*': (a, b) => a * b,
            '/': (a, b) => b !== 0 ? a / b : 'Error: Divide by zero',
        };
    }
    
    async calculate(expression) {
        const [a, operator, b] = expression.split(' ');
        const opFunc = this.operations[operator];
        
        if (!opFunc) {
            throw new Error('Unsupported operation');
        }

        const result = await new Promise((resolve) => {
            setTimeout(() => resolve(opFunc(Number(a), Number(b))), 1000);
        });

        this.#history.push({ expression, result });
        return result;
    }

    * history() {
        for (const entry of this.#history) {
            yield `${entry.expression} = ${entry.result}`;
        }
    }
}

(async () => {
    const calc = new AsyncCalculator();

    try {
        print(await calc.calculate('10 + 20'));
        print(await calc.calculate('30 / 0'));
        print(await calc.calculate('50 * 3'));
        
        print('History:');
        for (let record of calc.history()) {
            print(record);
        }
    } catch (error) {
        console.error(error);
    }
})();
