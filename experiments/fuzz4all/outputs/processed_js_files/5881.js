 

class DataProcessor {
    constructor(data) {
        this.data = data;
    }

    async processData() {
        const [first, ...rest] = this.data;
        print(`First item: ${first}`);
        
        const transformedData = await this.transformData(rest);
        print('Transformed Data:', transformedData);
    }

    async transformData(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const result = data.map(item => item * 2);
                    resolve(result);
                } catch (error) {
                    reject('Transformation failed');
                }
            }, 1000);
        });
    }
}

(async () => {
    const numbers = [1, 2, 3, 4, 5];
    const processor = new DataProcessor(numbers);
    
    try {
        await processor.processData();
    } catch (error) {
        console.error(error);
    }
})();
