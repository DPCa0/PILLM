class DataProcessor {
    constructor(data) {
        this.data = data;
    }

    #privateMethod() {
        return this.data.map(num => num * 2);
    }

    async processData() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.#privateMethod());
            }, 1000);
        });
    }

    static async* streamData(dataArray) {
        for (let item of dataArray) {
            yield await new Promise(resolve => setTimeout(() => resolve(item), 500));
        }
    }
}

(async () => {
    const dp = new DataProcessor([1, 2, 3, 4, 5]);
    print("Processing data...");
    
    const processedData = await dp.processData();
    print("Processed Data: ", processedData);

    print("Streaming Data:");
    for await (const item of DataProcessor.streamData(processedData)) {
        print("Streamed Item: ", item);
    }
})();
