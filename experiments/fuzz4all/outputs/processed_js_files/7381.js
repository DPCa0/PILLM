 

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === 'https://api.example.com/data') {
                resolve({ data: 'Sample Data' });
            } else {
                reject(new Error('Invalid URL'));
            }
        }, 1000);
    });
}

 
function* dataFetcher(urls) {
    for (const url of urls) {
        yield fetchData(url);
    }
}

 
async function handleDataFetching(urls) {
    const results = [];
    const generator = dataFetcher(urls);

    for (const promise of generator) {
        try {
            const result = await promise;
            results.push(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return results;
}

 
const urls = [...new Set([
    'https://api.example.com/data',
    'https://api.invalid.com/data',
    'https://api.example.com/data'
])];

 
handleDataFetching(urls).then(results => {
    print('Fetched Data:', results);
}).catch(error => {
    console.error('Error in handleDataFetching:', error);
});
