class NetworkRequest {
    static fetchData(url) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                Math.random() > 0.2 ? resolve(`Data from ${url}`) : reject('Fetch error');
            }, 1000);
        });
    }
}

async function processUrls(urls) {
    const results = [];
    for (const url of urls) {
        try {
            let data = await NetworkRequest.fetchData(url);
            results.push(data);
        } catch (error) {
            results.push(error);
        }
    }
    return results;
}

const urls = ['https://api.example1.com', 'https://api.example2.com', 'https://api.example3.com'];

processUrls(urls).then(results => {
    const filteredResults = results.filter(result => !result.includes('error'));
    const parsedResults = filteredResults.map(result => {
        let [message, url] = result.split(' from ');
        return { message, url };
    });
    
    const summary = parsedResults.reduce((acc, { url }) => {
        acc[url] = (acc[url] || 0) + 1;
        return acc;
    }, {});
    
    print('Parsed Results:', parsedResults);
    print('Summary:', summary);
}).catch(console.error);
