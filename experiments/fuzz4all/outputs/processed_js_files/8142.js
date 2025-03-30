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

const proxyHandler = {
    set(target, property, value) {
        target[property] = value;
        target.notify({ property, value });
        return true;
    }
};

const makeObservable = (target) => {
    const observable = new Observable();
    const proxy = new Proxy(target, proxyHandler);
    proxy.notify = observable.notify.bind(observable);
    proxy.subscribe = observable.subscribe.bind(observable);
    return proxy;
};

const state = makeObservable({ count: 0 });

state.subscribe(({ property, value }) => {
    print(`Property ${property} changed to ${value}`);
});

function* fibonacci() {
    let [prev, curr] = [0, 1];
    while (true) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

const fibGenerator = fibonacci();
state.count = fibGenerator.next().value;  
state.count = fibGenerator.next().value;  
state.count = fibGenerator.next().value;  
state.count = fibGenerator.next().value;  
state.count = fibGenerator.next().value;  

(async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const data = await response.json();
    state.count = data.id;  
})();
