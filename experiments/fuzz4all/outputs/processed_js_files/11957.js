class Fibonacci {
    constructor(limit) {
        this.limit = limit;
        this.memo = new Map();
    }

    *[Symbol.iterator]() {
        let [prev, curr] = [0, 1];
        while (curr <= this.limit) {
            yield curr;
            [prev, curr] = [curr, prev + curr];
        }
    }

    compute(n) {
        if (n <= 1) return n;
        if (this.memo.has(n)) return this.memo.get(n);
        const result = this.compute(n - 1) + this.compute(n - 2);
        this.memo.set(n, result);
        return result;
    }
}

const asyncFibonacci = async (limit) => {
    const fib = new Fibonacci(limit);
    const fibArray = [];

    for await (const num of fib) {
        fibArray.push(num);
    }

    return fibArray;
};

const formatResult = (arr) => `Fibonacci sequence: ${arr.join(', ')}`;

(async () => {
    const limit = 1000;
    const fibSequence = await asyncFibonacci(limit);
    const resultString = formatResult(fibSequence);

    print(resultString);

    const randomIndex = Math.floor(Math.random() * 10);
    print(`Random Fibonacci: ${new Fibonacci(limit).compute(randomIndex)}`);
})();
