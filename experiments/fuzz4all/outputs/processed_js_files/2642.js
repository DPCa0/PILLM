class PubSub {
    constructor() {
        this.subscribers = new Map();
    }

    subscribe(event, callback) {
        if (!this.subscribers.has(event)) {
            this.subscribers.set(event, []);
        }
        this.subscribers.get(event).push(callback);
    }

    publish(event, data) {
        if (this.subscribers.has(event)) {
            this.subscribers.get(event).forEach(callback => callback(data));
        }
    }
}

const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
};

const pubSub = new PubSub();
const logDebounced = debounce(data => print('Debounced Log:', data), 1000);

pubSub.subscribe('data', data => print('Immediate Log:', data));
pubSub.subscribe('data', logDebounced);

const generateData = async function* () {
    const dataPoints = ['Data 1', 'Data 2', 'Data 3', 'Data 4', 'Data 5'];
    for (const point of dataPoints) {
        await new Promise(resolve => setTimeout(resolve, 500));
        yield point;
    }
};

(async () => {
    for await (const data of generateData()) {
        pubSub.publish('data', data);
    }
})();
