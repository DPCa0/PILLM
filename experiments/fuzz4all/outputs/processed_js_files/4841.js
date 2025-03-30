 

class NetworkRequester {
    constructor(urls) {
        this.urls = urls;
        this.responses = new Map();
    }

    async fetchData() {
        const fetchPromises = this.urls.map(url => fetch(url).then(res => res.json()));
        const results = await Promise.all(fetchPromises);

        results.forEach((result, index) => {
            const { title, body } = result;
            this.responses.set(this.urls[index], { title, body });
        });
    }

    displayResults() {
        for (const [url, { title, body }] of this.responses.entries()) {
            print(`URL: ${url}\nTitle: ${title}\nBody: ${body}\n`);
        }
    }
}

(async () => {
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
        'https://jsonplaceholder.typicode.com/posts/3'
    ];
    
    const requester = new NetworkRequester(urls);
    await requester.fetchData();
    requester.displayResults();
})();
