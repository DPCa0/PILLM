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

const dataStore = new Proxy({ count: 0 }, {
    get(target, property) {
        print(`Getting property: ${property}`);
        return target[property];
    },
    set(target, property, value) {
        print(`Setting property: ${property} to ${value}`);
        target[property] = value;
        observer.notify({ [property]: value });
        return true;
    }
});

const observer = new Observable();

const unsubscribe = observer.subscribe(data => {
    print('Subscriber 1 received:', data);
    if (data.count === 5) {
        print('Subscriber 1 unsubscribing');
        unsubscribe();
    }
});

observer.subscribe(data => {
    print('Subscriber 2 received:', data);
});

(async function updateCount() {
    for (let i = 1; i <= 10; i++) {
        await new Promise(resolve => setTimeout(resolve, 500));
        dataStore.count = i;
    }
})();
