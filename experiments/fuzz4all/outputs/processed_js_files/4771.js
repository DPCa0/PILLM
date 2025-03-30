class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

const asyncIterable = {
    async *[Symbol.asyncIterator]() {
        for (let i = 0; i < 3; i++) {
            await new Promise(r => setTimeout(r, 1000));  
            yield `Async count: ${i}`;
        }
    }
};

(async () => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchWithTimeout = (url, timeout) => {
        const deferred = new Deferred();
        const timer = setTimeout(() => deferred.reject(new Error('Request timed out')), timeout);

        fetch(url, { signal })
            .then(response => response.json())
            .then(data => {
                clearTimeout(timer);
                deferred.resolve(data);
            })
            .catch(err => deferred.reject(err));

        return deferred.promise;
    };

    try {
        const data = await fetchWithTimeout('https://jsonplaceholder.typicode.com/todos/1', 2000);
        print('Fetched data:', data);

        for await (const item of asyncIterable) {
            print(item);
        }
    } catch (err) {
        console.error('Error:', err);
    }
})();
