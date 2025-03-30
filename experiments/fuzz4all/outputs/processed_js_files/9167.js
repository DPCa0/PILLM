class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

async function fetchWithTimeout(url, timeout = 5000) {
    const controller = new AbortController();
    const signal = controller.signal;

    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, { signal }).catch((error) => {
        if (error.name === 'AbortError') {
            throw new Error('Request timed out');
        }
        throw error;
    });

    clearTimeout(timeoutId);
    return response.json();
}

function* fibonacciGenerator(max) {
    let a = 0, b = 1;
    while (max-- > 0) {
        yield a;
        [a, b] = [b, a + b];
    }
}

(async () => {
    const fibonacci = [...fibonacciGenerator(10)];
    print('Fibonacci sequence:', fibonacci);

    const deferred = new Deferred();
    setTimeout(() => deferred.resolve('Deferred resolved!'), 2000);

    try {
        print(await fetchWithTimeout('https://jsonplaceholder.typicode.com/todos/1', 1000));
    } catch (error) {
        console.error(error.message);
    }

    print(await deferred.promise);
})();
