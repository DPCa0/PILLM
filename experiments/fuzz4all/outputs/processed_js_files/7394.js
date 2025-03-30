class Fibonacci {
    constructor(limit) {
        this.limit = limit;
    }

    *generate() {
        let [prev, curr] = [0, 1];
        while (curr <= this.limit) {
            yield curr;
            [prev, curr] = [curr, prev + curr];
        }
    }
}

const logFibonacciSequence = (limit) => {
    const fib = new Fibonacci(limit);
    const fibonacciNumbers = [...fib.generate()];

    return fibonacciNumbers.map(num => num ** 2).reduce((acc, val) => acc + val, 0);
};

const delayExecution = async (limit) => {
    print('Calculating Fibonacci sequence...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    const result = logFibonacciSequence(limit);
    print(`Sum of squares: ${result}`);
};

(async () => {
    try {
        await delayExecution(100);
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
