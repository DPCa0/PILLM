class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

function* dataProcessor(data) {
    for (const item of data) {
        if (item.value > 10) {
            yield item;
        }
    }
}

async function main() {
    try {
        const deferred = new Deferred();
        
         
        (async function simulateDataFetching() {
            setTimeout(() => deferred.resolve('https://api.example.com/data'), 1000);
        })();
        
        const url = await deferred.promise;
        const rawData = await fetchData(url);
        
        const processedData = [...dataProcessor(rawData)];
        
        const transformedData = processedData.map(({ name, value }) => ({ name, value: value * 2 }));
        
        print('Transformed Data:', transformedData);
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

main();
