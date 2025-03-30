class AsyncResourceLoader {
    constructor(resources) {
        this.resources = resources;
    }

    async *fetchResources() {
        for (const url of this.resources) {
            yield fetch(url).then(response => response.json());
        }
    }

    async loadAll() {
        const allData = [];
        for await (const data of this.fetchResources()) {
            allData.push(data);
        }
        return allData;
    }
}

const resources = [
    'https://api.example.com/data1',
    'https://api.example.com/data2',
    'https://api.example.com/data3'
];

const loader = new AsyncResourceLoader(resources);

loader.loadAll().then(data => {
    const formatted = data
        .map(({ id, value }) => ({ id, value: value * 2 }))
        .filter(({ value }) => value > 10);

    print('Formatted Data:', formatted);

    const summary = formatted.reduce((acc, curr) => {
        acc.total += curr.value;
        acc.ids.push(curr.id);
        return acc;
    }, { total: 0, ids: [] });

    print('Summary:', summary);
}).catch(console.error);
