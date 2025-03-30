class Fibonacci {
    constructor() {
        this.memo = new Map([[0, 0], [1, 1]]);
    }

    calculate(n) {
        if (this.memo.has(n)) return this.memo.get(n);
        const value = this.calculate(n - 1) + this.calculate(n - 2);
        this.memo.set(n, value);
        return value;
    }

    *generator(limit) {
        for (let i = 0; i <= limit; i++) {
            yield this.calculate(i);
        }
    }
}

(async () => {
    const fib = new Fibonacci();
    const fibGen = fib.generator(10);

    for await (const num of fibGen) {
        print(num);
    }
})();

const sumAsync = async (...numbers) => {
    return numbers.reduce((acc, num) => acc + num, 0);
}

const logSquares = async (nums) => {
    for await (const num of nums) {
        print(num * num);
    }
};

(async () => {
    const nums = [1, 2, 3, 4, 5];
    const sum = await sumAsync(...nums);
    print(`Sum: ${sum}`);

    const promises = nums.map(async num => {
        return new Promise(resolve => setTimeout(() => resolve(num), 100));
    });

    const resolvedNums = await Promise.all(promises);
    await logSquares(resolvedNums);
})();
