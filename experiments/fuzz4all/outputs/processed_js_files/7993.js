 
class ComplexCalculator {
    #secretMultiplier = 42;

    constructor(initialValue) {
        this.value = initialValue;
    }

     
    static pi() {
        return Math.PI;
    }

     
    get computedValue() {
        return this.value * this.#secretMultiplier;
    }

     
    *sequenceGenerator(limit) {
        for (let i = 0; i < limit; i++) {
            yield i * this.value;
        }
    }

     
    calculateSum(...args) {
        const [first, second, ...rest] = args;
        return [first, second, ...rest].reduce((acc, curr) => acc + curr, 0);
    }
}

 
async function runComplexCalculation() {
    const calc = new ComplexCalculator(5);
    const sequence = [...calc.sequenceGenerator(5)];

    const sumTask = Promise.resolve(calc.calculateSum(...sequence));
    const piTask = Promise.resolve(ComplexCalculator.pi());

    const [sumResult, piResult] = await Promise.all([sumTask, piTask]);

     
    print('Computed Value:', calc.computedValue);
    print('Sum of Sequence:', sumResult);
    print('Pi:', piResult);

     
    const iterator = sequence[Symbol.iterator]();
    let result = iterator.next();
    while (!result.done) {
        print('Sequence Value:', result.value);
        result = iterator.next();
    }
}

 
runComplexCalculation();
