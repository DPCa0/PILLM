class Observable {
    constructor() {
        this.subscribers = new Set();
    }
    
    subscribe(observerFunction) {
        this.subscribers.add(observerFunction);
    }

    unsubscribe(observerFunction) {
        this.subscribers.delete(observerFunction);
    }

    notify(data) {
        this.subscribers.forEach(observerFunction => observerFunction(data));
    }
}

function createProxy(target, handler) {
    return new Proxy(target, handler);
}

function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
}

const observable = new Observable();

const handler = {
    set(target, property, value) {
        target[property] = value;
        observable.notify({ property, value });
        return true;
    }
};

const data = createProxy({ count: 0 }, handler);

observable.subscribe(({ property, value }) => {
    print(`Property ${property} changed to ${value}`);
});

const incrementDataCount = debounce(() => {
    data.count += 1;
}, 1000);

document.addEventListener("click", incrementDataCount);

fetchData('https://jsonplaceholder.typicode.com/todos/1')
    .then(data => console.log(data))
    .catch(error => console.error('Error fetching data:', error));
