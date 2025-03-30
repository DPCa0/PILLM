class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch error: ", error);
        throw error;
    }
}

function* dataProcessor(data) {
    for (const item of data) {
        yield item.value * 2;
    }
}

(async () => {
    const deferred = new Deferred();
    const sampleURL = 'https://jsonplaceholder.typicode.com/posts';

    fetchData(sampleURL)
        .then(deferred.resolve)
        .catch(deferred.reject);

    try {
        const result = await deferred.promise;
        print('Data fetched successfully:', result);

        const generator = dataProcessor(result);
        for (let value of generator) {
            print('Processed value:', value);
        }
    } catch (error) {
        console.error('Error processing data:', error);
    }
})();
