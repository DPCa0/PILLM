class Observable {
    constructor() {
        this.subscribers = new Set();
    }

    subscribe(fn) {
        this.subscribers.add(fn);
    }

    unsubscribe(fn) {
        this.subscribers.delete(fn);
    }

    notify(data) {
        this.subscribers.forEach(fn => fn(data));
    }
}

function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

async function* asyncGenerator(array) {
    for (const item of array) {
        yield new Promise(resolve => setTimeout(() => resolve(item), 1000));
    }
}

(async () => {
    const observable = new Observable();
    const debouncedLog = debounce(console.log, 300);

    observable.subscribe(data => print('Subscriber 1:', data));
    observable.subscribe(debouncedLog);

    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
        const generator = asyncGenerator(data);

        for await (const post of generator) {
            observable.notify(post);
        }
    } catch (error) {
        console.error('Error:', error);
    }
})();
