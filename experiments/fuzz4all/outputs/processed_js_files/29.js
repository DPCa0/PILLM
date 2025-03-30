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
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}

async function fetchData(url) {
    const response = await fetch(url);
    return await response.json();
}

const observable = new Observable();

observable.subscribe(data => print('Subscriber 1:', data));
observable.subscribe(data => print('Subscriber 2:', data));

const debouncedFetch = debounce(async () => {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
    observable.notify(data);
}, 1000);

document.addEventListener('click', debouncedFetch);

(async function* dataStream() {
    while (true) {
        yield new Promise(resolve => setTimeout(resolve, 500));
    }
})().next().then(() => print('Async Generator Completed'));
