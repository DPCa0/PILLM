class Calculator {
    constructor() {
        this.history = [];
    }

    async calculate(operation, ...args) {
        try {
            const result = await this.#execute(operation, ...args);
            this.#log(operation, args, result);
            return result;
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    }

    #execute(operation, ...args) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const operations = {
                    add: (a, b) => a + b,
                    subtract: (a, b) => a - b,
                    multiply: (a, b) => a * b,
                    divide: (a, b) => {
                        if (b === 0) throw new Error('Division by zero');
                        return a / b;
                    },
                };

                if (operations[operation]) {
                    resolve(operations[operation](...args));
                } else {
                    reject(new Error('Invalid operation'));
                }
            }, 500);
        });
    }

    #log(operation, args, result) {
        this.history.push({ operation, args, result, timestamp: new Date() });
        this.#displayHistory();
    }

    #displayHistory() {
        console.clear();
        console.table(this.history, ["timestamp", "operation", "args", "result"]);
    }
}

 
(async () => {
    const calculator = new Calculator();
    try {
        print(await calculator.calculate('add', 5, 3));
        print(await calculator.calculate('multiply', 4, 2));
        print(await calculator.calculate('divide', 9, 3));
        print(await calculator.calculate('subtract', 10, 6));
        print(await calculator.calculate('divide', 8, 0));   
    } catch (e) {
        console.error(e.message);
    }
})();
