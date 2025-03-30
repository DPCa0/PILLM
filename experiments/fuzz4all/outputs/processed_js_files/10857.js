 

class DataProcessor {
    constructor(data) {
        this.data = data;
    }

    async processData() {
        const results = await Promise.all(this.data.map(item => this.fetchData(item)));
        const uniqueResults = [...new Set(results.flat())];
        const resultMap = uniqueResults.reduce((map, value) => {
            map.set(value, (map.get(value) || 0) + 1);
            return map;
        }, new Map());

        return [...resultMap.entries()]
            .sort((a, b) => b[1] - a[1])
            .map(([key, value]) => ({ key, value }));
    }

    fetchData(item) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([`${item}_result1`, `${item}_result2`]);
            }, Math.random() * 1000);
        });
    }
}

(async () => {
    const data = ['alpha', 'beta', 'gamma'];
    const processor = new DataProcessor(data);
    const processedData = await processor.processData();

    print('Processed Data:', processedData);
})();
