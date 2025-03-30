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

const debounce = (func, delay) => {
    let debounceTimer;
    return function(...args) {
        const context = this;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
};

const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

(async () => {
    const eventEmitter = new EventEmitter();

    eventEmitter.on('dataReceived', debounce(data => {
        print('Data received and processed:', data);
    }, 300));

    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
        eventEmitter.emit('dataReceived', data);
    } catch (error) {
        console.error('Fetching data failed:', error);
    }
})();
