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

const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
    return response.json();
};

const main = async () => {
    const dataObservable = new Observable();

    dataObservable.subscribe(data => print('Subscriber 1:', data));
    dataObservable.subscribe(data => print('Subscriber 2:', data.toUpperCase()));

    try {
        const url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
        const data = await fetchData(url);
        const message = `Latest commit by: ${data[0].commit.author.name}`;
        
        dataObservable.notify(message);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

main();
