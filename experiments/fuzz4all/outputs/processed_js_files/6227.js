class Observable {
    constructor() {
        this.subscribers = new Set();
    }
    
    subscribe(observer) {
        this.subscribers.add(observer);
        return () => this.subscribers.delete(observer);
    }
    
    notify(data) {
        this.subscribers.forEach(observer => observer(data));
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncIterable = {
    async *[Symbol.asyncIterator]() {
        const values = [1, 2, 3, 4, 5];
        for (const value of values) {
            await delay(1000);  
            yield value;
        }
    }
};

async function processStream() {
    const observable = new Observable();
    
    const unsubscribe = observable.subscribe(data => print(`Received: ${data}`));
    
    for await (const value of asyncIterable) {
        if (value === 4) unsubscribe();  
        observable.notify(value);
    }
}

processStream();
