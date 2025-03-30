 

class DataProcessor {
    constructor(data) {
        this.data = data;
    }

    async process() {
        try {
            const results = await Promise.all(this.data.map(async (item) => {
                const processed = await this.asyncOperation(item);
                return processed;
            }));
            const [first, ...rest] = results;
            this.logResults(first, ...rest);
        } catch (error) {
            console.error('Error processing data:', error);
        }
    }

    async asyncOperation(item) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`Processed: ${item}`);
            }, 1000);
        });
    }

    logResults(first, ...rest) {
        print(`First result: ${first}`);
        print(`Other results: ${rest.join(', ')}`);
    }
}

const sampleData = ['data1', 'data2', 'data3', 'data4', 'data5'];

const processor = new DataProcessor(sampleData);
processor.process();
