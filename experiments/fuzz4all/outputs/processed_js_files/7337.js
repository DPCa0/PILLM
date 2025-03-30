class EventEmitter {
    constructor() {
        this.events = new Map();
    }
    
    on(event, listener) {
        if (!this.events.has(event)) this.events.set(event, []);
        this.events.get(event).push(listener);
    }
    
    emit(event, ...args) {
        if (!this.events.has(event)) return;
        for (const listener of this.events.get(event)) {
            listener(...args);
        }
    }
}

const asyncHandler = async (generatorFunc) => {
    const iterator = generatorFunc();
    const process = (result) => {
        if (result.done) return Promise.resolve(result.value);
        return Promise.resolve(result.value).then(
            res => process(iterator.next(res)),
            err => process(iterator.throw(err))
        );
    };
    return process(iterator.next());
};

const simulateAsync = (ms, value) => new Promise(resolve => setTimeout(() => resolve(value), ms));

function* fetchData() {
    try {
        const data = yield simulateAsync(1000, "Fetched Data");
        print(data);
        const moreData = yield simulateAsync(1000, `${data} and More Data`);
        print(moreData);
    } catch (err) {
        console.error("Error:", err);
    }
}

const eventEmitter = new EventEmitter();

eventEmitter.on('start', () => {
    print('Event Started');
    asyncHandler(fetchData);
});

eventEmitter.on('done', () => print('Event Done'));

eventEmitter.emit('start');
setTimeout(() => eventEmitter.emit('done'), 2500);
