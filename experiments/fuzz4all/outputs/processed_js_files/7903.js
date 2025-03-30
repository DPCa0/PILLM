const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* fibonacci(max) {
    let [prev, curr] = [0, 1];
    while (curr <= max) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

async function fetchWithRetry(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url);
            if (response.ok) return await response.json();
            throw new Error(`Failed to fetch: ${response.status}`);
        } catch (error) {
            if (i < retries - 1) await delay(1000);
            else console.error('Max retries reached', error);
        }
    }
}

(async () => {
    print('Fibonacci Sequence:');
    for await (const num of fibonacci(50)) {
        print(num);
        await delay(500);
    }

    const data = await fetchWithRetry('https://jsonplaceholder.typicode.com/posts/1');
    print('Fetched Data:', data);
})();
