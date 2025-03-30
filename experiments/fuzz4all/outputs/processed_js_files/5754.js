 

class DataProcessor {
    constructor(data) {
        this.data = data;
    }

    async process() {
        try {
            const results = await Promise.all(this.data.map(async (item) => {
                const processedItem = await this.simulateAsyncOperation(item);
                return this.transform(processedItem);
            }));
            return results;
        } catch (error) {
            console.error('Error processing data:', error);
            throw error;
        }
    }

    simulateAsyncOperation(item) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(item * 2), 100);
        });
    }

    transform(item) {
        return { original: item / 2, transformed: item };
    }
}

async function run() {
    const data = [1, 2, 3, 4, 5];
    const processor = new DataProcessor(data);

    const result = await processor.process();

    const [first, ...rest] = result;
    print('First item:', first);
    print('Rest of the items:', ...rest);

    const sumOfTransformed = result.reduce((sum, { transformed }) => sum + transformed, 0);
    print('Sum of transformed data:', sumOfTransformed);
}

run();
