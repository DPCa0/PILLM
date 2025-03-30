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

class Computed {
    constructor(fn, observable) {
        this.fn = fn;
        this.observable = observable;
        this.cachedValue = undefined;
        this.dirty = true;

        this.observable.subscribe(() => {
            this.dirty = true;
        });
    }

    evaluate() {
        if (this.dirty) {
            this.cachedValue = this.fn();
            this.dirty = false;
        }
        return this.cachedValue;
    }
}

 
const state = new Proxy({ a: 1, b: 2 }, {
    get(target, prop, receiver) {
        print(`Getting ${prop}`);
        return Reflect.get(...arguments);
    },
    set(target, prop, value, receiver) {
        print(`Setting ${prop} to ${value}`);
        observable.notify({ prop, value });
        return Reflect.set(...arguments);
    }
});

const observable = new Observable();
observable.subscribe(({ prop, value }) => {
    print(`Property ${prop} changed to ${value}`);
});

const sum = new Computed(() => state.a + state.b, observable);

print(`Sum initially: ${sum.evaluate()}`);  

state.a = 3;  
print(`Sum after state change: ${sum.evaluate()}`);  

state.b = 4;  
print(`Sum after another state change: ${sum.evaluate()}`);  
