 

class ComplexCalculator {
    constructor() {
        this.operations = [];
    }

    async addOperation(operation) {
        const validatedOperation = await this.validateOperation(operation);
        this.operations.push(validatedOperation);
        return `Operation added: ${validatedOperation}`;
    }

    async validateOperation(operation) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (typeof operation === 'function') {
                    resolve(operation);
                } else {
                    reject(new Error('Invalid operation, must be a function.'));
                }
            }, 500);
        });
    }

    async compute(initialValue) {
        let result = initialValue;
        for (const operation of this.operations) {
            result = await operation(result);
        }
        return result;
    }
}

 
const operations = {
    add: (x) => async (y) => x + y,
    multiply: (x) => async (y) => x * y,
    subtract: (x) => async (y) => y - x
};

 
(async () => {
    const calculator = new ComplexCalculator();

    try {
        print(await calculator.addOperation(operations.add(5)));
        print(await calculator.addOperation(operations.multiply(3)));
        print(await calculator.addOperation(operations.subtract(2)));

        const result = await calculator.compute(10);  
        print(`Final result: ${result}`);  
    } catch (error) {
        console.error(error.message);
    }
})();
