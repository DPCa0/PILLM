class AsyncIterable {
    constructor(max) {
        this.max = max;
        this.current = 0;
    }

    [Symbol.asyncIterator]() {
        return {
            max: this.max,
            current: this.current,
            async next() {
                await new Promise(resolve => setTimeout(resolve, 100));  
                if (this.current < this.max) {
                    return { value: this.current++, done: false };
                }
                return { done: true };
            }
        };
    }
}

async function* fibonacci(max) {
    let [prev, current] = [0, 1];
    while (current < max) {
        yield current;
        [prev, current] = [current, prev + current];
    }
}

async function process() {
    const iterable = new AsyncIterable(10);
    const fibGen = fibonacci(100);

     
    const results = await Promise.all([
        (async () => {
            print("Async Iterable:");
            for await (const num of iterable) {
                print(num);
            }
        })(),
        (async () => {
            print("Fibonacci Sequence:");
            for await (const num of fibGen) {
                print(num);
            }
        })()
    ]);
}

process().then(() => print("Done processing!"));
