class AsyncIterableQueue {
    constructor() {
        this.queue = [];
        this.resolveQueue = [];
    }

    enqueue(item) {
        const nextResolve = this.resolveQueue.shift();
        if (nextResolve) {
            nextResolve({ done: false, value: item });
        } else {
            this.queue.push(item);
        }
    }

    dequeue() {
        return new Promise((resolve) => {
            const nextItem = this.queue.shift();
            if (nextItem !== undefined) {
                resolve({ done: false, value: nextItem });
            } else {
                this.resolveQueue.push(resolve);
            }
        });
    }

    [Symbol.asyncIterator]() {
        return this;
    }

    async next() {
        return await this.dequeue();
    }
}

async function* fibonacciSequence(max = 10) {
    let [prev, curr] = [0, 1];
    let count = 0;
    while (count++ < max) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

async function main() {
    const fibQueue = new AsyncIterableQueue();
    const fibSeq = fibonacciSequence(20);

    (async () => {
        for await (const num of fibSeq) {
            fibQueue.enqueue(num);
            await new Promise(res => setTimeout(res, 100));  
        }
    })();

    for await (const num of fibQueue) {
        print(`Fibonacci: ${num}`);
        if (num > 1000) break;  
    }
}

main();
