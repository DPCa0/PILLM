 
const { randomUUID } = require('crypto');

 
const waitRandom = () => new Promise(resolve => {
    const delay = Math.floor(Math.random() * 3000);
    setTimeout(() => resolve(`Waited ${delay} ms`), delay);
});

 
async function fetchData(...urls) {
    const results = await Promise.all(urls.map(async (url) => {
        const [protocol, domain] = url.split('://');
        await waitRandom();
        return `${randomUUID()} - Data from ${domain} using ${protocol}`;
    }));
    return results;
}

 
function* generateUUIDs() {
    while (true) {
        yield randomUUID();
    }
}

 
async function processUrls(urls) {
    const processedData = (await fetchData(...urls)) ?? [];
    return processedData.map(data => data?.toUpperCase() ?? 'NO DATA');
}

 
(async () => {
    const urls = ['http://example.com', 'https://another.com', 'ftp://thirdsite.org'];
    const data = await processUrls(urls);
    data.forEach(item => print(item));

    const uuidIterator = generateUUIDs();
    print('Generated UUIDs:', uuidIterator.next().value, uuidIterator.next().value);
})();
