 
async function* fetchDataGenerator(urls) {
    for (const url of urls) {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch ${url}`);
        yield await response.json();
    }
}

const urlProxyHandler = {
    get(target, prop) {
        if (prop in target) {
            return target[prop];
        }
        console.warn(`Property ${prop} not found, using fallback URL`);
        return target.fallback;
    }
};

const urls = new Proxy({
    url1: 'https://api.example.com/data1',
    url2: 'https://api.example.com/data2',
    fallback: 'https://api.example.com/fallback'
}, urlProxyHandler);

(async () => {
    const dataUrls = ['url1', 'url2', 'url3'];
    const fetchData = fetchDataGenerator(dataUrls.map(key => urls[key]));

    for await (const data of fetchData) {
        print('Fetched data:', data);
    }
})().catch(err => console.error('Error fetching data:', err));
