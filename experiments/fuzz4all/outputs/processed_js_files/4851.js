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

function asyncFetch(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

async function* paginate(url) {
    let page = 1;
    while (true) {
        const data = await asyncFetch(`${url}?page=${page}`);
        if (!data.length) break;
        yield data;
        page++;
    }
}

const emitter = new EventEmitter();

emitter.on('dataReceived', data => {
    print(`Page ${data.page}:`, data.items);
});

(async () => {
    const paginator = paginate('https://jsonplaceholder.typicode.com/posts');
    for await (const data of paginator) {
        emitter.emit('dataReceived', { page: data.page, items: data });
    }
})();
