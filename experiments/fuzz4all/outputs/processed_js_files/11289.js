class Fibonacci {
    constructor(limit) {
        this.limit = limit;
    }

    *generateFibonacci() {
        let [prev, curr] = [0, 1];
        while (curr <= this.limit) {
            yield curr;
            [prev, curr] = [curr, prev + curr];
        }
    }
}

const timeout = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
    const fib = new Fibonacci(100);
    const fibGen = fib.generateFibonacci();

    print("Fibonacci sequence up to 100:");
    for (let value of fibGen) {
        print(value);
        await timeout(500);  
    }

    const numbers = [1, 2, 3, 4, 5];
    const doubled = numbers.map(n => n * 2);
    print("\nOriginal numbers:", numbers);
    print("Doubled numbers:", doubled);

    const asyncTask = async num => {
        await timeout(100);
        return num * 3;
    };

    const tripled = await Promise.all(numbers.map(asyncTask));
    print("Tripled numbers (processed asynchronously):", tripled);

    const uniqueNumbers = new Set([1, 2, 2, 3, 4, 4, 5]);
    print("\nUnique numbers (using Set):", [...uniqueNumbers]);

    const arrayFlat = [1, [2, [3, [4, [5]]]]];
    print("\nFlattened array:", arrayFlat.flat(Infinity));
}

main().catch(console.error);
