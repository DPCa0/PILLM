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

const fibonacci = {
    *[Symbol.iterator]() {
        let [prev, curr] = [0, 1];
        while (true) {
            yield curr;
            [prev, curr] = [curr, prev + curr];
        }
    }
};

async function processFibonacci(observable, limit) {
    let index = 0;
    for (const num of fibonacci) {
        if (index++ >= limit) break;
        await new Promise(r => setTimeout(r, 500));  
        observable.notify(`Fibonacci number ${index}: ${num}`);
    }
}

const observer = new Observable();
observer.subscribe(data => print(data));
observer.subscribe(data => print(`Received: ${data}`));

processFibonacci(observer, 10);
