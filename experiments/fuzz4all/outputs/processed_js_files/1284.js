class AsyncHandler {
    constructor() {
        this.cache = new Map();
    }

    async fetchData(url) {
        if (this.cache.has(url)) {
            print('Returning cached data for', url);
            return this.cache.get(url);
        }
        print('Fetching data from', url);
        let response = await fetch(url);
        let data = await response.json();
        this.cache.set(url, data);
        return data;
    }
}

async function* dataStream(urls) {
    const handler = new AsyncHandler();
    for (const url of urls) {
        yield handler.fetchData(url);
    }
}

(async () => {
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
        'https://jsonplaceholder.typicode.com/posts/3',
    ];

    for await (let dataPromise of dataStream(urls)) {
        dataPromise.then(data => print('Received data:', data));
    }
})();
