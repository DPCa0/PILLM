class AsyncProcessor {
    static async *fetchData(urls) {
        for (let url of urls) {
            const response = await fetch(url);
            yield response.json();
        }
    }
}

function memoize(fn) {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (!cache.has(key)) {
            cache.set(key, fn(...args));
        }
        return cache.get(key);
    };
}

const computeExpensiveOperation = memoize((num) => {
    print(`Computing expensive operation for ${num}`);
    return num * num;
});

(async function() {
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2'
    ];
    const processor = AsyncProcessor.fetchData(urls);

    for await (let data of processor) {
        print('Fetched data:', data);
    }

    print('Memoization Test:');
    print(computeExpensiveOperation(2));
    print(computeExpensiveOperation(2));  
})();
