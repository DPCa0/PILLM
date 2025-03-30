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

class ComputedProperty {
    constructor(dependencies, computeFn) {
        this.dependencies = dependencies;
        this.computeFn = computeFn;
        this.currentValue = this.compute();
        dependencies.forEach(dep => dep.subscribe(() => this.recompute()));
    }
    compute() {
        return this.computeFn();
    }
    recompute() {
        const newValue = this.compute();
        if (newValue !== this.currentValue) {
            this.currentValue = newValue;
            print("Computed value changed:", this.currentValue);
        }
    }
}

const observable1 = new Observable();
const observable2 = new Observable();

const sumComputed = new ComputedProperty([observable1, observable2], () => {
    const value1 = observable1.currentValue || 0;
    const value2 = observable2.currentValue || 0;
    return value1 + value2;
});

observable1.notify({ currentValue: 5 });
observable2.notify({ currentValue: 10 });

setTimeout(() => {
    observable1.notify({ currentValue: 15 });
}, 1000);

setTimeout(() => {
    observable2.notify({ currentValue: 20 });
}, 2000);
