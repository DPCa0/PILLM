class AsyncQueue {
    constructor() {
        this.queue = [];
        this.isProcessing = false;
    }

    async enqueue(promiseGenerator) {
        this.queue.push(promiseGenerator);
        if (!this.isProcessing) {
            this.isProcessing = true;
            while (this.queue.length > 0) {
                const current = this.queue.shift();
                try {
                    await current();
                } catch (err) {
                    console.error('Error processing promise:', err);
                }
            }
            this.isProcessing = false;
        }
    }
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const myQueue = new AsyncQueue();

 
const generatePromise = (id, delay) => async () => {
    await wait(delay);
    print(`Promise ${id} resolved after ${delay} ms`);
};

 
myQueue.enqueue(generatePromise(1, 1000));
myQueue.enqueue(generatePromise(2, 500));
myQueue.enqueue(generatePromise(3, 2000));

 
const object = { a: 1, b: { c: 2, d: 3 } };
const { a, b: { c, d } } = object;
print(`Destructured values: a=${a}, c=${c}, d=${d}`);

 
const arrowFunction = name => `Hello, ${name}! Welcome to the advanced JavaScript world.`;
print(arrowFunction("Coder"));
