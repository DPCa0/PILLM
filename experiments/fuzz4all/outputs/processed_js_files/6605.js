class Fibonacci {
    constructor() {
        this.memo = new Map([[0, 0], [1, 1]]);
    }

    calculate(n) {
        if (this.memo.has(n)) return this.memo.get(n);
        const result = this.calculate(n - 1) + this.calculate(n - 2);
        this.memo.set(n, result);
        return result;
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function asyncTimeout(fn, ms) {
    print('Function will execute after delay...');
    await delay(ms);
    return fn();
}

const fibInstance = new Fibonacci();

(async () => {
    try {
        const result = await asyncTimeout(() => {
            print('Calculating Fibonacci...');
            return fibInstance.calculate(10);
        }, 2000);

        print(`Fibonacci result: ${result}`);
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
