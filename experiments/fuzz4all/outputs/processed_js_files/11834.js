class Observable {
    constructor(value) {
        this._value = value;
        this._subscribers = new Set();
    }
    
    subscribe(callback) {
        this._subscribers.add(callback);
        callback(this._value);
        return () => this._subscribers.delete(callback);
    }
    
    set value(newValue) {
        if (newValue !== this._value) {
            this._value = newValue;
            this._notify();
        }
    }
    
    get value() {
        return this._value;
    }
    
    _notify() {
        this._subscribers.forEach(callback => callback(this._value));
    }
}

function computed(computeFunction, dependencies) {
    const observable = new Observable(computeFunction());
    
    const unsubscribers = dependencies.map(dep =>
        dep.subscribe(() => observable.value = computeFunction())
    );
    
    return {
        subscribe: observable.subscribe.bind(observable),
        unsubscribeAll: () => unsubscribers.forEach(unsub => unsub())
    };
}

 

const obsA = new Observable(10);
const obsB = new Observable(20);

const sum = computed(() => obsA.value + obsB.value, [obsA, obsB]);
const product = computed(() => obsA.value * obsB.value, [obsA, obsB]);

const sumUnsub = sum.subscribe(value => print(`Sum: ${value}`));
const productUnsub = product.subscribe(value => print(`Product: ${value}`));

obsA.value = 15;  

 
sumUnsub();
productUnsub();
sum.unsubscribeAll();
product.unsubscribeAll();
