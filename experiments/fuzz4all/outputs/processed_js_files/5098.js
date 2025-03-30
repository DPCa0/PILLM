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

    off(event, listener) {
        if (this.events.has(event)) {
            this.events.set(event, this.events.get(event).filter(l => l !== listener));
        }
    }
}

const fetchData = async url => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

const emitter = new EventEmitter();

const dataListener = async url => {
    try {
        const data = await fetchData(url);
        print('Data received:', data);
    } catch (error) {
        console.error('Data fetch error:', error);
    }
};

const debounce = (func, wait) => {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

emitter.on('fetchData', debounce(dataListener, 300));

document.querySelector('#fetchButton').addEventListener('click', () => {
    emitter.emit('fetchData', 'https://api.example.com/data');
});
