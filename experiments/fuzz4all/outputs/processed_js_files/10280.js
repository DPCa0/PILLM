 

 
class ComplexCalculator {
    #history = [];

     
    static #isNumber(value) {
        return typeof value === 'number' && !isNaN(value);
    }

     
    #logOperation(operation, result) {
        this.#history.push({ operation, result, timestamp: new Date() });
    }

     
    addNumbers(...numbers) {
        return new Promise((resolve, reject) => {
            if (numbers.every(ComplexCalculator.#isNumber)) {
                const result = numbers.reduce((a, b) => a + b, 0);
                this.#logOperation(`Adding [${numbers.join(', ')}]`, result);
                resolve(`Result: ${result}`);
            } else {
                reject(new Error('Invalid input: All inputs must be numbers.'));
            }
        });
    }

     
    async *getHistory() {
        for (const record of this.#history) {
            yield new Promise(resolve => setTimeout(() => resolve(record), 1000));
        }
    }
}

 
(async () => {
    const calculator = new ComplexCalculator();
    
    try {
        print(await calculator.addNumbers(5, 10, 15, 20));
        print(await calculator.addNumbers(3, 7));
    } catch (error) {
        console.error(error.message);
    }
    
    print("Operation History:");
    for await (const record of calculator.getHistory()) {
        print(`${record.timestamp.toISOString()}: ${record.operation} = ${record.result}`);
    }
})();
