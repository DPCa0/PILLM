 
const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url) {
                resolve(`Data from ${url}`);
            } else {
                reject('URL not provided');
            }
        }, 1000);
    });
};

async function* dataGenerator(urls) {
    for (const url of urls) {
        try {
            const data = await fetchData(url);
            yield data;
        } catch (error) {
            console.error(error);
        }
    }
}

(async () => {
    const urls = ['https://api.example.com/data1', 'https://api.example.com/data2', null];
    const results = [];
    
    for await (const data of dataGenerator(urls)) {
        if (data) {
            results.push(data);
        }
    }

    const [first, ...rest] = results;
    const upperCasedResults = rest.map(item => item.toUpperCase());

    print('First Result:', first);
    print('Upper Cased Results:', upperCasedResults);
})();
