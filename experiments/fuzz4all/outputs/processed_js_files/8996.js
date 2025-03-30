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

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

const processNumbers = function* (numbers) {
    for (const number of numbers) {
        yield number * 2;
    }
};

(async () => {
    const emitter = new EventEmitter();

    emitter.on('dataLoaded', (data) => {
        print('Data Loaded:', data);
        
        const numbers = [1, 2, 3, 4, 5];
        const processed = [...processNumbers(numbers)];
        
        print('Processed Numbers:', processed);
    });

    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
        emitter.emit('dataLoaded', data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
