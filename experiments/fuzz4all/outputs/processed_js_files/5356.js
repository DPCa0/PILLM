 
class Observable {
    constructor(value) {
        this._value = value;
        this._listeners = new Set();
    }

    get value() {
        return this._value;
    }

    set value(newValue) {
        if (this._value !== newValue) {
            this._value = newValue;
            this.notify();
        }
    }

    subscribe(listener) {
        this._listeners.add(listener);
        return () => this._listeners.delete(listener);
    }

    notify() {
        this._listeners.forEach(listener => listener(this._value));
    }
}

const createProxy = target => {
    return new Proxy(target, {
        get(target, prop) {
            print(`Getting ${prop}`);
            return Reflect.get(target, prop);
        },
        set(target, prop, value) {
            print(`Setting ${prop} to ${value}`);
            return Reflect.set(target, prop, value);
        }
    });
};

const observable = new Observable(10);
const unsubscribe = observable.subscribe(value => print(`Value changed to ${value}`));

observable.value = 20;  
unsubscribe();

const user = createProxy({ name: 'Alice', age: 30 });
user.name = 'Bob';       
print(user.name);  

const asyncOperation = async () => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    await delay(1000);
    print('Async operation complete');
};

(async () => {
    print('Starting async operation');
    await asyncOperation();
    print('Continuing after async operation');
})();

print('Script end');
