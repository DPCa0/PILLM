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

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const parallelFetch = async (urls) => {
    const fetches = urls.map(url => fetch(url).then(res => res.json()));
    return Promise.all(fetches);
};

const sleepSort = async (numbers, callback) => {
    const sorted = [];

    await Promise.all(numbers.map(n => delay(n).then(() => {
        sorted.push(n);
        callback(sorted);
    })));

    return sorted;
};

const numbers = [300, 100, 200];
const eventEmitter = new EventEmitter();

eventEmitter.on('sorted', sorted => {
    print('Current sorted list:', sorted);
});

(async () => {
    print('Starting sleepSort...');
    const result = await sleepSort(numbers, sorted => eventEmitter.emit('sorted', sorted));
    print('Final sorted list:', result);

    print('Fetching data...');
    const urls = ['https://api.github.com', 'https://api.nasa.gov'];
    const data = await parallelFetch(urls);
    print('Fetched data:', data);
})();
