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

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const asyncIterable = {
    [Symbol.asyncIterator]: function() {
        return {
            async next() {
                await delay(1000);
                if (Math.random() > 0.1) {
                    return { value: Math.floor(Math.random() * 100), done: false };
                }
                return { done: true };
            }
        };
    }
};

(async function() {
    const observable = new Observable();
    
    observable.subscribe(data => print(`Subscriber 1 received: ${data}`));
    observable.subscribe(data => print(`Subscriber 2 received: ${data}`));

    for await (let value of asyncIterable) {
        observable.notify(value);
    }

    print('Iteration complete');
})();
