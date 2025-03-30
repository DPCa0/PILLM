 
function* fibonacciGenerator(limit) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < limit; i++) {
        [prev, curr] = [curr, prev + curr];
        yield prev;
    }
}

 
async function fetchData(url) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Data from ${url}`);
        }, 1000);
    });
}

 
class DataProcessor {
    #data;

    constructor(data) {
        this.#data = data;
    }

    #processData() {
        return this.#data.map((x) => x * 2);
    }

    getProcessedData() {
        return this.#processData();
    }
}

 
(async function main() {
    try {
        const fibGen = fibonacciGenerator(5);
        const fibNumbers = [...fibGen];

        const urls = ['https://api.example1.com', 'https://api.example2.com'];
        const dataPromises = urls.map((url) => fetchData(url));
        const fetchedData = await Promise.all(dataPromises);

        const processor = new DataProcessor(fibNumbers);
        const processedData = processor.getProcessedData();

        print('Fetched Data:', fetchedData);
        print('Processed Fibonacci Data:', processedData);
    } catch (error) {
        console.error('Error:', error);
    }
})();
