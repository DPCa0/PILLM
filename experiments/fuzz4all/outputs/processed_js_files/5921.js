class AsyncIterableQueue {
    constructor() {
        this.queue = [];
        this.resolve = null;
    }
    
    enqueue(item) {
        if (this.resolve) {
            this.resolve({ done: false, value: item });
            this.resolve = null;
        } else {
            this.queue.push(item);
        }
    }
    
    [Symbol.asyncIterator]() {
        return {
            next: () => {
                if (this.queue.length > 0) {
                    return Promise.resolve({ done: false, value: this.queue.shift() });
                }
                return new Promise(resolve => this.resolve = resolve);
            }
        };
    }
}

(async function main() {
    const asyncQueue = new AsyncIterableQueue();

     
    const eventProducer = async function*() {
        const events = ['event1', 'event2', 'event3'];
        for (const event of events) {
            await new Promise(resolve => setTimeout(resolve, 1000));  
            yield event;
        }
    };

    const eventConsumer = async function() {
        for await (const event of asyncQueue) {
            print(`Consumed: ${event}`);
        }
    };

    eventConsumer();

    for await (const event of eventProducer()) {
        print(`Produced: ${event}`);
        asyncQueue.enqueue(event);
    }
})();
