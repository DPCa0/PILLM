class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

async function fetchDataWithRetry(url, retries = 3) {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    for (let i = 0; i <= retries; i++) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (err) {
            if (i === retries) throw err;
            await delay(1000);
        }
    }
}

async function* fetchGenerator(urls) {
    for (const url of urls) {
        yield fetchDataWithRetry(url);
    }
}

(async () => {
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
        'https://jsonplaceholder.typicode.com/posts/3'
    ];

    const deferredResults = urls.map(() => new Deferred());
    const promises = deferredResults.map(deferred => deferred.promise);
    const generator = fetchGenerator(urls);

    let index = 0;
    for await (const data of generator) {
        deferredResults[index++].resolve(data);
    }

    const results = await Promise.all(promises);
    print(results);
})();
