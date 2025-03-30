 

class ComplexCalculator {
    #value;
    
    constructor(initValue = 0) {
        this.#value = initValue;
    }

    get value() {
        return this.#value;
    }

    add(...numbers) {
        this.#value += numbers.reduce((sum, num) => sum + num, 0);
        return this;
    }

    subtract(...numbers) {
        this.#value -= numbers.reduce((sum, num) => sum + num, 0);
        return this;
    }

    multiply(factor) {
        this.#value *= factor;
        return this;
    }

    divide(divisor) {
        if (divisor === 0) throw new Error("Division by zero");
        this.#value /= divisor;
        return this;
    }

    static async asyncCalculate(asyncFunc) {
        const result = await asyncFunc();
        return result;
    }
}

 
(async () => {
    const calculator = new ComplexCalculator(10);

    await ComplexCalculator.asyncCalculate(async () => {
        return new Promise(resolve => {
            setTimeout(() => {
                print("Async calculation started...");
                const result = calculator.add(2, 3).subtract(1).multiply(2).divide(2).value;
                print("Async calculation finished: ", result);
                resolve(result);
            }, 1000);
        });
    });

     
    print("Final value: ", calculator.add(5, 10).multiply(2).value);
})();
