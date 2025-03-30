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

const observable = new Observable();

const delayedComputation = async (val) => {
    return new Promise((resolve) => setTimeout(() => resolve(val * 2), 1000));
};

const generatorFunction = function* (start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
};

const enhancedIterator = {
    [Symbol.iterator]: function* () {
        const gen = generatorFunction(1, 5);
        for (const val of gen) {
            yield delayedComputation(val).then(res => observable.notify(res));
        }
    }
};

observable.subscribe(data => print(`Received data: ${data}`));

(async () => {
    for await (const _ of enhancedIterator) {
         
    }
})();
