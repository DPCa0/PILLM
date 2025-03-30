class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    emit(event, ...args) {
        if (this.events[event]) {
            this.events[event].forEach(listener => listener(...args));
        }
    }
}

async function fetchData(url) {
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

const fetchDataWithRetry = async (url, retries = 3) => {
    while (retries--) {
        try {
            return await fetchData(url);
        } catch (err) {
            if (!retries) throw err;
        }
    }
};

const main = async () => {
    const eventEmitter = new EventEmitter();

    eventEmitter.on('dataFetched', (data) => {
        print('Data fetched:', data);
    });

    eventEmitter.on('error', (err) => {
        console.error('Error fetching data:', err);
    });

    try {
        const data = await fetchDataWithRetry('https://jsonplaceholder.typicode.com/posts');
        eventEmitter.emit('dataFetched', data);
    } catch (err) {
        eventEmitter.emit('error', err);
    }
};

main();
