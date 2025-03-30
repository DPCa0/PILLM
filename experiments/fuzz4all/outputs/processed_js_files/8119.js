class Observable {
    constructor() {
        this.subscribers = new Set();
    }

    subscribe(fn) {
        this.subscribers.add(fn);
        return () => this.subscribers.delete(fn);
    }

    notify(data) {
        this.subscribers.forEach(fn => fn(data));
    }
}

const asyncOperation = () => new Promise((resolve) => {
    setTimeout(() => resolve(Math.random()), 1000);
});

const pipeline = async function* () {
    while (true) {
        const result = await asyncOperation();
        yield result;
    }
};

const observable = new Observable();

const transformAndNotify = async () => {
    for await (const data of pipeline()) {
        const transformedData = `Transformed Value: ${data.toFixed(2)}`;
        observable.notify(transformedData);
    }
};

const logData = (data) => print(`Subscriber 1: ${data}`);
const logDataAlternate = (data) => print(`Subscriber 2: ${data}`);

const unsubscribe1 = observable.subscribe(logData);
observable.subscribe(logDataAlternate);

transformAndNotify();

 
setTimeout(() => {
    unsubscribe1();
    print("Subscriber 1 unsubscribed.");
}, 5000);
