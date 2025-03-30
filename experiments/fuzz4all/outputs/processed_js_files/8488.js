class EventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(listener);
    }

    emit(event, ...args) {
        if (this.events.has(event)) {
            this.events.get(event).forEach(listener => listener(...args));
        }
    }
}

const fetchData = url => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (url === "https://api.example.com/data") {
            resolve({ data: [1, 2, 3, 4, 5] });
        } else {
            reject(new Error("Invalid URL"));
        }
    }, 1000);
});

async function processData(url) {
    const cache = new WeakMap();
    if (cache.has(url)) {
        return cache.get(url);
    }
    try {
        const response = await fetchData(url);
        const doubledData = response.data.map(x => x * 2);
        cache.set(url, doubledData);
        return doubledData;
    } catch (error) {
        console.error(error);
        return [];
    }
}

(async () => {
    const emitter = new EventEmitter();
    const url = new URL("https://api.example.com/data");
    
    emitter.on("dataReceived", data => {
        print("Data processed: ", data);
    });

    const data = await processData(url.href);
    emitter.emit("dataReceived", data);
})();
