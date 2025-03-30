class EventEmitter {
    constructor() {
        this.events = new Map();
    }
    on(event, listener) {
        if (!this.events.has(event)) this.events.set(event, []);
        this.events.get(event).push(listener);
    }
    emit(event, ...args) {
        if (this.events.has(event)) {
            this.events.get(event).forEach(listener => listener(...args));
        }
    }
}

const delay = ms => new Promise(res => setTimeout(res, ms));

const fetchData = async (url) => {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        return await response.json();
    } catch (error) {
        console.error("Fetch error:", error);
    }
};

const main = async () => {
    const eventEmitter = new EventEmitter();

    eventEmitter.on('dataFetched', data => {
        print("Data fetched:", data);
    });

    eventEmitter.on('error', error => {
        print("Error occurred:", error);
    });

    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
        if (data) eventEmitter.emit('dataFetched', data);
    } catch (error) {
        eventEmitter.emit('error', error);
    }

    await delay(1000);
    print("Waiting 1 second before completing...");
};

main().catch(console.error);
