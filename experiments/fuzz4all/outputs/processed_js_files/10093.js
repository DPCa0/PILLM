class Fibonacci {
    constructor(limit) {
        this.limit = limit;
        this.sequence = [...this.generate()];
    }

    *generate() {
        let [prev, current] = [0, 1];
        while (current <= this.limit) {
            yield current;
            [prev, current] = [current, prev + current];
        }
    }

    async displaySequence() {
        for (const num of this.sequence) {
            await new Promise(resolve => setTimeout(resolve, 500));  
            print(num);
        }
    }

    [Symbol.iterator]() {
        return this.sequence.values();
    }
}

const transformFibonacci = ({ sequence }) =>
    sequence.map(num => num * 2);

(async () => {
    const fib = new Fibonacci(100);

    print("Original Fibonacci Sequence:");
    await fib.displaySequence();

    print("\nTransformed Sequence (doubled values):");
    const transformedSequence = transformFibonacci(fib);
    for (const num of transformedSequence) {
        print(num);
    }
})();
