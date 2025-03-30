class Observable {
    constructor() {
        this.subscribers = [];
    }

    subscribe(fn) {
        this.subscribers.push(fn);
    }

    notify(data) {
        this.subscribers.forEach(subscriber => subscriber(data));
    }
}

const observable = new Observable();

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

observable.subscribe(debounce(data => print("Data received:", data), 500));

(async () => {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    observable.notify(data);
})();

const map = new Map();
map.set('name', 'Advanced JS');
map.set('type', 'Example');

for (const [key, value] of map.entries()) {
    print(`${key}: ${value}`);
}
