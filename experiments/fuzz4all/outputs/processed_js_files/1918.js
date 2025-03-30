class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

async function fetchData(url) {
    const deferred = new Deferred();

    const controller = new AbortController();
    const signal = controller.signal;

    setTimeout(() => controller.abort(), 5000);

    try {
        const response = await fetch(url, { signal });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        deferred.resolve(data);
    } catch (error) {
        deferred.reject(error);
    }

    return deferred.promise;
}

async function* processData(url) {
    try {
        const data = await fetchData(url);
        for (const item of data) {
            yield item.toUpperCase();
        }
    } catch (error) {
        console.error('Error processing data:', error);
    }
}

(async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const dataGenerator = processData(url);

    for await (const processedData of dataGenerator) {
        print(processedData);
    }
})();
