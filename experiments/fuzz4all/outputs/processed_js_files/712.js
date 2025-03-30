class Observable {
    constructor() {
        this.subscribers = new Set();
    }

    subscribe(callback) {
        this.subscribers.add(callback);
    }

    unsubscribe(callback) {
        this.subscribers.delete(callback);
    }

    notify(data) {
        this.subscribers.forEach(callback => callback(data));
    }
}

const createDebouncedFunction = (func, delay) => {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
};

const fetchData = async () => {
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/posts');
        let data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch error: ", error);
    }
};

const dataObservable = new Observable();
dataObservable.subscribe(createDebouncedFunction(async (data) => {
    const posts = await data();
    print('Debounced Fetch Data:', posts.slice(0, 5));
}, 500));

const proxyHandler = {
    set(target, property, value) {
        print(`Property '${property}' set to '${value}'`);
        Reflect.set(target, property, value);
        dataObservable.notify(fetchData);
        return true;
    }
};

const appState = new Proxy({ fetchData }, proxyHandler);

print('Changing state...');
appState.dummyChange = 'trigger';
