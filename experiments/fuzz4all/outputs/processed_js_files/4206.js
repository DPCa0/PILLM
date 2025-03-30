 

class DataProcessor {
    constructor(data) {
        this.data = data;
    }

     
    async process() {
        await this.timeout(2000);
        return this.data.map(({ name, value }) => `${name}: ${value * 2}`);
    }

     
    timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

(async () => {
    const rawData = [
        { name: 'Alice', value: 10 },
        { name: 'Bob', value: 20 },
        { name: 'Charlie', value: 30 }
    ];

    const processor = new DataProcessor(rawData);
    const results = await processor.process();

    const logResults = (messages) => messages.forEach(message => print(message));

     
    const [first, ...rest] = results;
    print('Processed Data:');
    print(first);
    logResults(rest);
})();
