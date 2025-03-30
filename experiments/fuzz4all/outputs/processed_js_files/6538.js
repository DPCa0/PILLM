 

class DataProcessor {
    constructor(data) {
        this.data = data;
    }
    
    async processData() {
        const result = [];
        
        for (const item of this.data) {
             
            const processed = await this.simulateAsyncProcessing(item);
            result.push(processed);
        }
        
        return result;
    }
    
    simulateAsyncProcessing(item) {
        return new Promise(resolve => {
            setTimeout(() => resolve(item * 2), 100);
        });
    }
}

const handler = {
    get(target, prop, receiver) {
        if (prop === 'data') {
            print('Accessed data:', Reflect.get(...arguments));
        }
        return Reflect.get(...arguments);
    }
};

const data = [1, 2, 3, 4, 5];
const dataProcessor = new Proxy(new DataProcessor(data), handler);

(async () => {
    const processedData = await dataProcessor.processData();
    
    const dataMap = new Map();
    
    processedData.forEach((value, index) => {
        dataMap.set(`item${index + 1}`, value);
    });
    
    print('Processed data in Map:');
    for (const [key, value] of dataMap) {
        print(`${key}: ${value}`);
    }
})();
