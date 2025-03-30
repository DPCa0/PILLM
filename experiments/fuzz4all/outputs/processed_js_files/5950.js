 
const fetchData = (url) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (url) resolve({ data: `Data from ${url}` });
        else reject(new Error('Invalid URL'));
    }, 1000);
});

 
async function* fetchUrls(urls) {
    for (const url of urls) {
        try {
            const response = await fetchData(url);
            yield response.data;
        } catch (error) {
            console.error(error);
        }
    }
}

 
(async () => {
    const urls = ['https://api.example.com/1', 'https://api.example.com/2', null];
    const urlDataGenerator = fetchUrls(urls);

     
    for await (const data of urlDataGenerator) {
        print(data);
    }

     
    const target = { message: 'Hello, advanced JavaScript!' };
    const handler = {
        get(target, property) {
            print(`Property ${property} accessed`);
            return property in target ? target[property] : 'Property not found';
        }
    };
    const proxy = new Proxy(target, handler);

     
    print(proxy.message);
    print(proxy.nonexistentProperty);
})();
