class Fibonacci {
    #sequence = [0, 1];

    constructor(n) {
        if (n < 0) throw new Error("Fibonacci sequence index cannot be negative");
        this.calculate(n);
    }

    *[Symbol.iterator]() {
        for (let num of this.#sequence) {
            yield num;
        }
    }

    calculate(n) {
        if (n <= this.#sequence.length - 1) return;
        for (let i = this.#sequence.length; i <= n; i++) {
            this.#sequence.push(
                this.#sequence[i - 1] + this.#sequence[i - 2]
            );
        }
    }

    async display() {
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
        print("Fibonacci Sequence:");
        for (const num of this) {
            await delay(500);  
            print(num);
        }
    }

    static async fromAsyncIterable(asyncIterable) {
        const instance = new Fibonacci(0);
        for await (const value of asyncIterable) {
            instance.calculate(value);
        }
        return instance;
    }
}

const main = async () => {
    const fib = new Fibonacci(10);
    await fib.display();

     
    const asyncIterable = (async function* () {
        for (let i = 0; i <= 15; i += 5) {
            yield i;
        }
    })();

    const newFib = await Fibonacci.fromAsyncIterable(asyncIterable);
    await newFib.display();
};

main();
