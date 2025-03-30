 

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url) {
                resolve(`Data from ${url}`);
            } else {
                reject('Invalid URL');
            }
        }, 1000);
    });
}

 
function* urlGenerator() {
    yield 'https://api.example.com/data1';
    yield 'https://api.example.com/data2';
    yield 'https://api.example.com/data3';
}

 
async function processUrls() {
    const urls = urlGenerator();

    for (let url of urls) {
        try {
            const data = await fetchData(url);
            print(`Fetched: ${data}`);
        } catch (error) {
            console.error(`Error fetching data: ${error}`);
        }
    }
}

 
(async () => {
    print('Starting URL processing...');
    await processUrls();
    print('Finished URL processing.');
})();
