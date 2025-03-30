class ComplexCalculator {
    #results = new Map();

    constructor() {
        this.operations = {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
            '*': (a, b) => a * b,
            '/': (a, b) => a / b,
            '**': (a, b) => a ** b
        };
    }

    compute(operation, a, b) {
        if (!this.operations[operation]) {
            throw new Error('Invalid operation');
        }
        const result = this.operations[operation](a, b);
        this.#storeResult(operation, a, b, result);
        return result;
    }

    #storeResult(operation, a, b, result) {
        const expression = `${a} ${operation} ${b}`;
        this.#results.set(expression, result);
    }

    *history() {
        for (let [expression, result] of this.#results.entries()) {
            yield `${expression} = ${result}`;
        }
    }

    async fetchExternalData(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    static async execute() {
        try {
            const calc = new ComplexCalculator();
            print(calc.compute('+', 3, 7));  
            print(calc.compute('**', 2, 8));  

            for (let record of calc.history()) {
                print(record);
            }

            const data = await calc.fetchExternalData('https://jsonplaceholder.typicode.com/todos/1');
            print('External Data:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

ComplexCalculator.execute();
