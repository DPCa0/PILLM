class Observable {
    constructor() {
        this.subscribers = new Set();
    }

    subscribe(observer) {
        this.subscribers.add(observer);
    }

    unsubscribe(observer) {
        this.subscribers.delete(observer);
    }

    notify(data) {
        this.subscribers.forEach(observer => observer.update(data));
    }
}

class Observer {
    constructor(name) {
        this.name = name;
    }

    update(data) {
        print(`${this.name} received update:`, data);
    }
}

const observable = new Observable();

const observer1 = new Observer('Observer 1');
const observer2 = new Observer('Observer 2');

observable.subscribe(observer1);
observable.subscribe(observer2);

const asyncDataGenerator = async function* () {
    let count = 1;
    while (count <= 5) {
        yield new Promise((resolve) => {
            setTimeout(() => resolve(`Data ${count++}`), 1000);
        });
    }
};

(async () => {
    for await (const dataPromise of asyncDataGenerator()) {
        observable.notify(await dataPromise);
    }
})();
