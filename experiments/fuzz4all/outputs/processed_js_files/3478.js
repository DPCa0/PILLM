class Observable {
    constructor() {
        this.observers = new Set();
    }

    subscribe(observer) {
        this.observers.add(observer);
    }

    unsubscribe(observer) {
        this.observers.delete(observer);
    }

    notify(data) {
        this.observers.forEach(observer => observer.update(data));
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

const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
};

const debounce = (fn, delay) => {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
};

(async () => {
    const observable = new Observable();
    const observer1 = new Observer(1);
    const observer2 = new Observer(2);

    observable.subscribe(observer1);
    observable.subscribe(observer2);

    const debouncedNotify = debounce(data => observable.notify(data), 300);

    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
        debouncedNotify(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
