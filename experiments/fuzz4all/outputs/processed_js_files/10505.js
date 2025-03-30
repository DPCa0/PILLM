class Observable {
    constructor() {
        this.subscribers = new Set();
    }
    
    subscribe(fn) {
        this.subscribers.add(fn);
    }
    
    unsubscribe(fn) {
        this.subscribers.delete(fn);
    }
    
    notify(data) {
        this.subscribers.forEach(fn => fn(data));
    }
}

const asyncIterable = {
    [Symbol.asyncIterator]: async function* () {
        for (let i = 1; i <= 5; i++) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            yield `Message ${i}`;
        }
    }
};

const observable = new Observable();
observable.subscribe(data => print(`Subscriber 1: ${data}`));
observable.subscribe(data => print(`Subscriber 2: ${data}`));

(async () => {
    for await (const message of asyncIterable) {
        observable.notify(message);
    }
})();
