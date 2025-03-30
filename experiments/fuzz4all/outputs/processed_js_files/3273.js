class AsyncResource {
    constructor() {
        this.cache = new Map();
    }

    async fetchResource(url) {
        if (this.cache.has(url)) {
            print('Fetching from cache:', url);
            return Promise.resolve(this.cache.get(url));
        } else {
            print('Fetching from network:', url);
            const response = await fetch(url);
            const data = await response.json();
            this.cache.set(url, data);
            return data;
        }
    }
}

const withLogger = (fn) => (...args) => {
    print(`Calling function ${fn.name} with arguments:`, args);
    return fn(...args);
};

const delayedExecution = (delay) => {
    return new Promise((resolve) => setTimeout(resolve, delay));
};

async function complexFunction() {
    const resource = new AsyncResource();
    
    const urls = [
        'https://jsonplaceholder.typicode.com/todos/1',
        'https://jsonplaceholder.typicode.com/todos/2',
        'https://jsonplaceholder.typicode.com/todos/3',
    ];

    const fetchWithLog = withLogger(resource.fetchResource.bind(resource));

    const results = await Promise.all(urls.map((url, index) => 
        delayedExecution(index * 1000).then(() => fetchWithLog(url))
    ));

    print('Final results:', results);
}

complexFunction();
