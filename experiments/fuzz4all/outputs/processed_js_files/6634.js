class DeferredPromise extends Promise {
    constructor(executor) {
        let resolve, reject;
        super((res, rej) => {
            resolve = res;
            reject = rej;
            executor(res, rej);
        });
        this.resolve = resolve;
        this.reject = reject;
    }
}

function fetchData(url) {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeout = setTimeout(() => controller.abort(), 5000);

    return fetch(url, { signal })
        .then(response => {
            clearTimeout(timeout);
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .catch(error => {
            if (error.name === 'AbortError') {
                throw new Error('Request timed out');
            }
            throw error;
        });
}

async function handleData() {
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
        'https://jsonplaceholder.typicode.com/posts/3'
    ];

    try {
        const results = await Promise.all(urls.map(fetchData));
        print('Data fetched:', results);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function* dataGenerator(data) {
    for (const item of data) {
        yield item;
    }
}

const asyncIterator = async function* (generator) {
    for (const item of generator) {
        yield await Promise.resolve(item);
    }
};

const executeAsync = async () => {
    const data = [1, 2, 3, 4, 5];
    const generator = dataGenerator(data);
    for await (const num of asyncIterator(generator)) {
        print('Async Iterator value:', num);
    }
};

(async () => {
    await handleData();
    await executeAsync();
    const deferred = new DeferredPromise((resolve) => setTimeout(resolve, 1000, 'Deferred Promise Resolved!'));
    deferred.then(console.log);
})();
