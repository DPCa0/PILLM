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

const asyncOperation = async () => {
    return new Promise(resolve => setTimeout(() => resolve("Async operation complete!"), 1000));
};

(async () => {
    const emitter = new EventEmitter();

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    emitter.on("dataReceived", data => {
        print(`Listener 1: ${data}`);
    });

    emitter.on("dataReceived", async data => {
        await delay(500);
        print(`Listener 2: ${data}`);
    });

    const data = await asyncOperation();
    emitter.emit("dataReceived", data);

    const fetchData = async (url) => {
        const response = await fetch(url);
        return await response.json();
    };

    const url = "https://jsonplaceholder.typicode.com/todos/1";
    const todo = await fetchData(url);
    print(`Fetched Todo: ${JSON.stringify(todo)}`);
})();
