class ComplexCalculator {
    #memory = 0;  

    constructor() {
         
        this.#operations = new WeakMap();
        this.#operations.set(this, []);
    }

    add(x, y) {
        const result = x + y;
        this.#logOperation('add', x, y, result);
        return result;
    }

    subtract(x, y) {
        const result = x - y;
        this.#logOperation('subtract', x, y, result);
        return result;
    }

    async multiply(x, y) {
        const result = await this.#simulateDelay(() => x * y);
        this.#logOperation('multiply', x, y, result);
        return result;
    }

    divide(x, y) {
        if (y === 0) throw new Error("Can't divide by zero");
        const result = x / y;
        this.#logOperation('divide', x, y, result);
        return result;
    }

    *factorial(n) {
        if (n < 0) throw new Error("Negative numbers not allowed");
        let result = 1;
        for (let i = 1; i <= n; i++) {
            result *= i;
            yield result;
        }
        this.#logOperation('factorial', n, null, result);
    }

    storeInMemory(value) {
        this.#memory = value;
    }

    recallMemory() {
        return this.#memory;
    }

    #logOperation(type, x, y, result) {
        const operations = this.#operations.get(this);
        operations.push({ type, operands: [x, y], result });
    }

    async #simulateDelay(fn) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(fn());
            }, 1000);
        });
    }

    get operationsLog() {
        return this.#operations.get(this);
    }
}

(async () => {
    const calculator = new ComplexCalculator();

    print(calculator.add(5, 3));
    print(calculator.subtract(10, 4));
    print(await calculator.multiply(3, 7));

    const factorial = calculator.factorial(5);
    for (let value of factorial) {
        print(value);
    }

    try {
        print(calculator.divide(20, 0));
    } catch (error) {
        console.error(error.message