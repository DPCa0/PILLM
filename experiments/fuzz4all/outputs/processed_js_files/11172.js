 

class DataProcessor {
    constructor(data) {
        this.dataSet = new Set(data);
    }

    filterData(criteria) {
        return [...this.dataSet].filter(criteria);
    }

    async processData() {
        const filteredData = this.filterData(num => num % 2 === 0);
        const processedData = await this.simulateAsyncOperation(filteredData);
        return processedData;
    }

    simulateAsyncOperation(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const result = data.map(num => num * num);
                    resolve(result);
                } catch (error) {
                    reject('Error processing data');
                }
            }, 1000);
        });
    }
}

(async () => {
    const rawData = [1, 2, 3, 4, 5, 6];
    const dataProcessor = new DataProcessor(rawData);

    try {
        const processedData = await dataProcessor.processData();
        const mapResult = new Map(processedData.map((value, index) => [index, value]));

        mapResult.forEach((value, key) => {
            print(`Index: ${key}, Squared Value: ${value}`);
        });
    } catch (error) {
        console.error('Error:', error);
    }
})();
