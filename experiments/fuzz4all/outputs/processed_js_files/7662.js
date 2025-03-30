class Observable {
    constructor() {
        this.subscribers = new Set();
    }

    subscribe(observer) {
        this.subscribers.add(observer);
        return () => this.subscribers.delete(observer);
    }

    notify(data) {
        this.subscribers.forEach(observer => observer.update(data));
    }
}

class Observer {
    constructor(id) {
        this.id = id;
    }

    update(data) {
        print(`Observer ${this.id} received data:`, data);
    }
}

const observable = new Observable();

const observer1 = new Observer(1);
const observer2 = new Observer(2);
const observer3 = new Observer(3);

const unsubscribe1 = observable.subscribe(observer1);
observable.subscribe(observer2);
observable.subscribe(observer3);

observable.notify({ msg: 'Hello Observers!' });

unsubscribe1();

observable.notify({ msg: 'Another message!' });

 
const targetObject = { message: "Hello Proxy!" };
const handler = {
    get: (target, prop, receiver) => {
        print(`Property "${prop}" has been accessed.`);
        return Reflect.get(...arguments);
    },
    set: (target, prop, value) => {
        print(`Property "${prop}" has been set to "${value}".`);
        return Reflect.set(...arguments);
    }
};

const proxy = new Proxy(targetObject, handler);

print(proxy.message);
proxy.message = "New message!";
