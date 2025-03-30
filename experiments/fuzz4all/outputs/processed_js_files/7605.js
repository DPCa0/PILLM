class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

async function fetchDataWithTimeout(url, timeout = 5000) {
    const controller = new AbortController();
    const timeoutHandler = setTimeout(() => controller.abort(), timeout);

    try {
        let response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutHandler);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('Fetch timed out');
        } else {
            throw error;
        }
    }
}

async function complexAsyncFlow() {
    const deferred = new Deferred();
    
    const dataProcessing = async () => {
        try {
            const data = await fetchDataWithTimeout('https://jsonplaceholder.typicode.com/todos/1', 2000);
            print('Fetched Data:', data);
            deferred.resolve('Data successfully processed');
        } catch (error) {
            console.error('Error fetching data:', error);
            deferred.reject('Data processing failed');
        }
    };

    const timeoutSim = setTimeout(() => deferred.reject('Timeout occurred'), 3000);
    Promise.race([deferred.promise, dataProcessing()]).finally(() => clearTimeout(timeoutSim));
}

complexAsyncFlow().then(result => {
    print(result);
}).catch(err => {
    console.error(err);
});
