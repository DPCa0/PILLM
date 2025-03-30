class Observable {
    constructor(value) {
        this.value = value;
        this.listeners = new Set();
    }

    subscribe(listener) {
        this.listeners.add(listener);
    }

    unsubscribe(listener) {
        this.listeners.delete(listener);
    }

    set value(newValue) {
        if (this._value !== newValue) {
            this._value = newValue;
            this.notify();
        }
    }

    get value() {
        return this._value;
    }

    notify() {
        this.listeners.forEach(listener => listener(this._value));
    }
}

async function* asyncGenerator(arr) {
    for (const item of arr) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        yield item;
    }
}

const observable = new Observable(0);

const logger = value => print(`Current value: ${value}`);
observable.subscribe(logger);

(async function() {
    for await (const num of asyncGenerator([1, 2, 3, 4, 5])) {
        observable.value = num;
    }
})();
