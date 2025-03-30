class Observable {
    constructor(value) {
        this.value = value;
        this.subscribers = new Set();
    }

    subscribe(subscriber) {
        this.subscribers.add(subscriber);
        subscriber(this.value);
    }

    setValue(newValue) {
        this.value = newValue;
        this.subscribers.forEach(subscriber => subscriber(this.value));
    }
}

function asyncProcess(observable) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newValue = Math.floor(Math.random() * 100);
            observable.setValue(newValue);
            resolve(newValue);
        }, 2000);
    });
}

const myObservable = new Observable(0);

myObservable.subscribe((value) => {
    print(`Subscriber 1: Value updated to ${value}`);
});

myObservable.subscribe((value) => {
    print(`Subscriber 2: Value updated to ${value}`);
});

(async () => {
    print('Starting async process...');
    const result = await asyncProcess(myObservable);
    print(`Async process completed with new value: ${result}`);
})();

 
const handler = {
    get(target, property, receiver) {
        if (property in target) {
            return Reflect.get(target, property, receiver);
        }
        return `Property ${property} does not exist`;
    }
};

const proxyObj = new Proxy({a: 10, b: 20}, handler);
print(proxyObj.a);  
print(proxyObj.c);  
