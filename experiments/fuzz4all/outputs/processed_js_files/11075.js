class Observable {
    constructor() {
        this.subscribers = new Set();
    }

    subscribe(callback) {
        this.subscribers.add(callback);
        return () => this.subscribers.delete(callback);
    }

    notify(data) {
        this.subscribers.forEach(callback => callback(data));
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

const dataObservable = new Observable();

dataObservable.subscribe(data => {
    print('Subscriber 1:', data);
});

const logOnce = data => {
    print('Log Once Subscriber:', data);
};
dataObservable.subscribe(logOnce);

dataObservable.subscribe(data => {
    print('Subscriber 2:', data.toUpperCase());
});

(async () => {
    try {
        const data = await fetchData('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');
        dataObservable.notify(data[0].commit.message);
    } catch (error) {
        console.error('Fetch error:', error);
    } finally {
         
        dataObservable.subscribers.delete(logOnce);
    }
})();
