class Fibonacci {
    constructor() {
        this.memo = new Map([[0, 0], [1, 1]]);
    }

    calculate(n) {
        if (this.memo.has(n)) return this.memo.get(n);
        let result = this.calculate(n - 1) + this.calculate(n - 2);
        this.memo.set(n, result);
        return result;
    }
}

async function* asyncFibonacci(limit) {
    let a = 0, b = 1, i = 0;
    while (i++ < limit) {
        await new Promise(resolve => setTimeout(resolve, 50));
        yield a;
        [a, b] = [b, a + b];
    }
}

(async () => {
    const fib = new Fibonacci();
    print(`10th Fibonacci number using memoization: ${fib.calculate(10)}`);

    print("First 10 Fibonacci numbers using async generator:");
    for await (let num of asyncFibonacci(10)) {
        print(num);
    }

    const array = [5, 1, 8, 3, 2];
    print("Sorted array with spread operator: ", [...array].sort((a, b) => a - b));

    const person = { name: "Alice", age: 25 };
    const clone = { ...person, location: "Wonderland" };
    print("Cloned object with extra property: ", clone);
})();
