(async function() {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    class ComplexCalculation {
        static #secretMultiplier = Math.random() * 100;
        
        constructor(values) {
            this.values = values;
        }

        *calculateSquares() {
            for (let value of this.values) {
                yield value ** 2;
            }
        }

        async calculateAsyncSum() {
            let sum = 0;
            for await (let value of this.#asyncValuesGenerator()) {
                sum += value;
            }
            return sum;
        }

        async *#asyncValuesGenerator() {
            for (let square of this.calculateSquares()) {
                await delay(100);
                yield square * ComplexCalculation.#secretMultiplier;
            }
        }
    }

    const values = [1, 2, 3, 4];
    const calculation = new ComplexCalculation(values);

    for (let square of calculation.calculateSquares()) {
        print(`Square: ${square}`);
    }

    const asyncSum = await calculation.calculateAsyncSum();
    print(`Asynchronous Secret Sum: ${asyncSum.toFixed(2)}`);
})();
