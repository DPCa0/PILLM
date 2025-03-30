 

class DataFetcher {
    constructor(urls) {
        this.urls = urls;
    }

     
    *urlGenerator() {
        for (let url of this.urls) {
            yield url;
        }
    }

     
    async fetchData() {
        const promises = [];
        for (const url of this.urlGenerator()) {
            const promise = fetch(url)
                .then(response => response.json())
                .catch(error => console.error('Error fetching data:', error));
            promises.push(promise);
        }
        const results = await Promise.all(promises);
        return results;
    }
}

(async () => {
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2'
    ];

    const dataFetcher = new DataFetcher(urls);
    
     
    const [first, second] = await dataFetcher.fetchData();

    print('First Post:', first);
    print('Second Post:', second);

     
    const mergedData = { ...first, ...second };
    print('Merged Data:', mergedData);
})();
