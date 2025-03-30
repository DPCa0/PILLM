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
        this.events.get(event).forEach(listener => listener(...args));
    }
}

const fetchData = url => fetch(url)
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    });

(async () => {
    const apiUrls = [
        'https://api.example.com/data1',
        'https://api.example.com/data2',
        'https://api.example.com/data3'
    ];

    const results = await Promise.allSettled(apiUrls.map(fetchData));
    const successData = results
        .filter(result => result.status === 'fulfilled')
        .map(result => result.value);

    const dataEmitter = new EventEmitter();
    dataEmitter.on('data', data => print('Data received:', data));

    if (successData.length) {
        successData.forEach(data => dataEmitter.emit('data', data));
    } else {
        console.error('No successful data fetch.');
    }
})();

function* fibonacci(n) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < n; i++) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

const fibSeq = fibonacci(10);
print([...fibSeq]);
