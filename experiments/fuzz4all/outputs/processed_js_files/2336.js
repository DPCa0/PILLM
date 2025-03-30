 

class DataFetcher {
    constructor(url) {
        this.url = url;
    }

    async fetchData() {
        try {
            const response = await fetch(this.url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            this.processData(data);
        } catch (error) {
            console.error(`Failed to fetch data: ${error.message}`);
        }
    }

    processData(data) {
        const { title, body } = data;
        print(`Data Received: ${title}`);
        print(`Content: ${body}`);
    }
}

class Observer {
    constructor() {
        this.subscribers = new Map();
    }

    subscribe(eventType, callback) {
        if (!this.subscribers.has(eventType)) {
            this.subscribers.set(eventType, []);
        }
        this.subscribers.get(eventType).push(callback);
    }

    notify(eventType, data) {
        const callbacks = this.subscribers.get(eventType) || [];
        callbacks.forEach(callback => callback(data));
    }
}

(async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts/1';
    const fetcher = new DataFetcher(url);
    const observer = new Observer();

    observer.subscribe('dataFetched', (data) => {
        print(`Observer Received Data: ${JSON.stringify(data)}`);
    });

    await fetcher.fetchData().then(data => {
        observer.notify('dataFetched', data);
    });
})();
