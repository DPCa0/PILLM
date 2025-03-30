class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

async function* asyncGenerator(interval) {
    for (let i = 0; i < 10; i++) {
        await new Promise(resolve => setTimeout(resolve, interval));
        yield i;
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchDataWithTimeout(url, timeout) {
    const deferred = new Deferred();

    const fetchPromise = fetch(url).then(response => response.json());
    const timeoutPromise = delay(timeout).then(() => deferred.reject('Request timed out'));

    Promise.race([fetchPromise, timeoutPromise])
        .then(data => deferred.resolve(data))
        .catch(err => deferred.reject(err));

    return deferred.promise;
}

(async () => {
    try {
        const asyncIter = asyncGenerator(500);
        for await (const num of asyncIter) {
            print(`Generated number: ${num}`);
        }

        const data = await fetchDataWithTimeout('https://jsonplaceholder.typicode.com/posts', 1000);
        print('Fetched data:', data.slice(0, 1));  
    } catch (error) {
        console.error('Error:', error);
    }
})();
