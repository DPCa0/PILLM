const asyncHandler = fn => (...args) => fn(...args).catch(args[2]);

const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
};

class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        (this.events[event] || (this.events[event] = [])).push(listener);
    }

    emit(event, ...args) {
        (this.events[event] || []).slice().forEach(fn => fn(...args));
    }
}

const eventEmitter = new EventEmitter();

const processData = asyncHandler(async (url) => {
    print("Fetching data...");
    const data = await fetchData(url);
    print("Data received:", data);
    eventEmitter.emit('dataProcessed', data);
});

const startApp = () => {
    eventEmitter.on('dataProcessed', (data) => {
        print("Processing complete. Here's the data again:", data);
    });

    processData('https://jsonplaceholder.typicode.com/todos/1');
};

startApp();
