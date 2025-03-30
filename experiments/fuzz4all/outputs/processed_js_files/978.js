const fetch = require('node-fetch');

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function* fetchWithDelay(urls, delayTime) {
    for (const url of urls) {
        const response = await fetch(url);
        if (!response.ok) {
            yield `Error fetching ${url}: ${response.statusText}`;
        } else {
            const data = await response.json();
            yield data;
        }
        await delay(delayTime);
    }
}

 
async function processData(urls) {
    const dataIterator = fetchWithDelay(urls, 1000);
    for await (const data of dataIterator) {
        if (typeof data === 'string') {
            console.error(data);
        } else {
            print('Fetched data:', data);
        }
    }
}

 
(async () => {
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
        'https://jsonplaceholder.typicode.com/posts/3'
    ];

    const fetchPromises = urls.map(url => fetch(url).then(response => response.json()));

    const results = await Promise.all(fetchPromises);

    const [firstResult, ...otherResults] = results;

    print('First fetched result:', firstResult);
    print('Other fetched results:', otherResults);

    print('Processing with delay:');
    await processData(urls);
})();
