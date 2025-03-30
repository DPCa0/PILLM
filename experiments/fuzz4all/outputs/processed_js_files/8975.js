 
async function* fetchData(urls) {
    for (const url of urls) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            yield data;
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
}

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
function logExecutionTime(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args) {
        console.time(propertyKey);
        const result = await originalMethod.apply(this, args);
        console.timeEnd(propertyKey);
        return result;
    };
    return descriptor;
}

 
class DataProcessor {
    constructor(urls) {
        this.urls = urls;
    }

    @logExecutionTime
    async processAllData() {
        const generator = fetchData(this.urls);
        const results = [];

        for await (const data of generator) {
            results.push(data);
            await delay(100);   
        }
        return results;
    }
}

 
(async () => {
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
        'https://jsonplaceholder.typicode.com/posts/3'
    ];

    const processor = new DataProcessor(urls);
    const results = await processor.processAllData();
    print('Processed data:', results);
})();
