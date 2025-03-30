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
        this.subscribers.forEach(subscriber => subscriber(data));
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* asyncGenerator(limit) {
    let i = 0;
    while (i < limit) {
        await delay(100);
        yield i++;
    }
}

(async () => {
    const observable = new Observable();
    
    observable.subscribe(data => print(`Subscriber 1: ${data}`));
    observable.subscribe(data => print(`Subscriber 2: ${data}`));

    for await (let num of asyncGenerator(5)) {
        observable.notify(`Generated number: ${num}`);
    }
})();
