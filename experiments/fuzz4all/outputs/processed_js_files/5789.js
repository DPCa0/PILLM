class Observable {
    constructor() {
        this.observers = new Map();
    }

    subscribe(event, callback) {
        if (!this.observers.has(event)) {
            this.observers.set(event, []);
        }
        this.observers.get(event).push(callback);
        return () => this.unsubscribe(event, callback);
    }

    unsubscribe(event, callback) {
        const callbacks = this.observers.get(event);
        if (callbacks) {
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        }
    }

    notify(event, data) {
        const callbacks = this.observers.get(event);
        if (callbacks) {
            callbacks.forEach(callback => callback(data));
        }
    }
}

const asyncIterable = {
    [Symbol.asyncIterator]: function () {
        let count = 0;
        return {
            next() {
                if (count < 5) {
                    return new Promise(resolve => {
                        setTimeout(() => resolve({ value: count++, done: false }), 1000);
                    });
                }
                return Promise.resolve({ done: true });
            }
        };
    }
};

(async () => {
    const observable = new Observable();
    
    observable.subscribe('data', data => print('Observer 1:', data));
    observable.subscribe('data', data => print('Observer 2:', data));

    for await (const num of asyncIterable) {
        observable.notify('data', num);
    }

    print('Async iteration completed');
})();
