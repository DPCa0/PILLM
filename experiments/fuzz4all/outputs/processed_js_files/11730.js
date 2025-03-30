 

class Fetcher {
    constructor(urls) {
        this.urls = urls;
    }

    async fetchAll() {
        try {
            const promises = this.urls.map(url => fetch(url).then(res => res.json()));
            const results = await Promise.all(promises);
            return results;
        } catch (error) {
            console.error('Fetching error:', error);
        }
    }
}

const manipulateData = async (fetcher) => {
    const results = await fetcher.fetchAll();
    return results.map(({ id, ...rest }) => ({ ...rest, identifier: id }));
};

const main = async () => {
    const urls = [
        'https://jsonplaceholder.typicode.com/todos/1',
        'https://jsonplaceholder.typicode.com/todos/2'
    ];

    const fetcher = new Fetcher(urls);
    const modifiedData = await manipulateData(fetcher);

    modifiedData.forEach(data => print(data));
};

main();
