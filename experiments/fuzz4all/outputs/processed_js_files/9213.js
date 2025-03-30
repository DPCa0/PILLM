class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

async function fetchData(url) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    try {
        let response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        throw new Error('Fetch failed: ' + error.message);
    } finally {
        clearTimeout(timeout);
    }
}

function* generateFibonacci(max) {
    let [prev, curr] = [0, 1];
    while (curr < max) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

(async function main() {
    const urls = [
        'https://jsonplaceholder.typicode.com/todos/1',
        'https://jsonplaceholder.typicode.com/todos/2',
        'https://jsonplaceholder.typicode.com/todos/3'
    ];

     
    const maxConcurrency = 2;
    const deferreds = urls.map(() => new Deferred());
    const results = [];
    
    let index = 0;
    while (index < urls.length || deferreds.some(d => !d.promiseSettled)) {
        const promisesToSettle = deferreds.filter(d => !d.promiseSettled).slice(0, maxConcurrency);

        promisesToSettle.forEach((d, i) => {
            d.promiseSettled = true;
            fetchData(urls[index + i])
                .then(result => {
                    results[index + i] = result;
                    d.resolve();
                })
                .catch(d.reject);
        });

        await Promise.all(promisesToSettle.map(d => d.promise));
        index += promisesToSettle.length;
    }

    print('Fetch results:', results);

     
    const fibMax = 1000;
    const fibonacciNumbers = [...generateFibonacci(fibMax)];
    print(`Fibonacci numbers under ${fibMax}:`, fibonacciNumbers);
})();
