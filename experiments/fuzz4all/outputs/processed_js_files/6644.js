class AsyncCalculator {
    #value;

    constructor(initialValue = 0) {
        this.#value = initialValue;
    }

    async #delayOperation(operation, delay = 1000) {
        return new Promise(resolve => setTimeout(() => resolve(operation()), delay));
    }

    async add(value) {
        this.#value = await this.#delayOperation(() => this.#value + value);
        return this;
    }

    async subtract(value) {
        this.#value = await this.#delayOperation(() => this.#value - value);
        return this;
    }

    async multiply(value) {
        this.#value = await this.#delayOperation(() => this.#value * value);
        return this;
    }

    async divide(value) {
        if (value === 0) throw new Error("Cannot divide by zero");
        this.#value = await this.#delayOperation(() => this.#value / value);
        return this;
    }

    static async *generateNumbers(limit) {
        for (let i = 0; i < limit; i++) {
            await new Promise(resolve => setTimeout(resolve, 500));
            yield i;
        }
    }

    getValue() {
        return this.#value;
    }
}

 
(async () => {
    const calculator = new AsyncCalculator(10);

    await calculator.add(5).subtract(3).multiply(2).divide(3);
    print("Final result:", calculator.getValue());

    print("Generating numbers:");
    for await (let num of AsyncCalculator.generateNumbers(5)) {
        print(num);
    }
})();
