 

class DataProcessor {
    constructor(data) {
        this.data = data;
        this.result = new Map();
    }

    processData() {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.data.forEach(({ id, value }) => {
                    this.result.set(id, value ** 2);
                });
                resolve(this.result);
            }, 1000);
        });
    }

    static async runProcessor(data) {
        const processor = new DataProcessor(data);
        const result = await processor.processData();
        return result;
    }
}

(async () => {
    const data = [
        { id: 1, value: 2 },
        { id: 2, value: 3 },
        { id: 3, value: 4 }
    ];

    const [first, ...rest] = await DataProcessor.runProcessor(data);
    print('First:', first);
    print('Rest:', [...rest]);

    const uniqueValues = new Set(data.map(({ value }) => value));
    print('Unique Values:', [...uniqueValues]);

    const mergedData = { ...data[0], additionalInfo: 'Sample Data' };
    print('Merged Data:', mergedData);
})();
