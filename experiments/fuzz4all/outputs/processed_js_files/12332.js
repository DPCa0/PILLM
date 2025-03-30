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

function fetchData(url) {
    return fetch(url).then(response => response.json());
}

async function* dataGenerator(url) {
    let page = 1;
    while (true) {
        const data = await fetchData(`${url}?page=${page}`);
        if (!data.length) break;
        yield data;
        page++;
    }
}

(async () => {
    const observable = new Observable();
    const debouncedLog = debounce(console.log, 300);

    observable.subscribe(debouncedLog);

    for await (const data of dataGenerator('https://api.example.com/data')) {
        observable.notify(data);
    }
})();
