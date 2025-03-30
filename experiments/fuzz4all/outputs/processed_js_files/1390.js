class FibonacciSequence {
    constructor(limit) {
        this.limit = limit;
        this.sequence = this.#generateSequence();
    }

    #generateSequence() {
        return {
            [Symbol.iterator]: function* () {
                let [prev, curr] = [0, 1];
                for (let i = 0; i < this.limit; i++) {
                    yield curr;
                    [prev, curr] = [curr, prev + curr];
                }
            }.bind(this),
        };
    }

    async processSequence() {
        const delays = [1000, 800, 600, 400, 200];
        for await (const number of this.sequence) {
            print(`Processing Fibonacci number: ${number}`);
            await new Promise(resolve => setTimeout(resolve, delays.shift() || 100));
        }
    }
}

(async () => {
    const limit = 10;
    const fibSequence = new FibonacciSequence(limit);
    
    print(`Generating and processing Fibonacci sequence up to ${limit} numbers...`);
    await fibSequence.processSequence();
    print('Processing complete!');
})();
