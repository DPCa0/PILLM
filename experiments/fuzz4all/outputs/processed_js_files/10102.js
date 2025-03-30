 
class DataProcessor {
    constructor() {
        this.data = [];
    }

    async fetchData(url) {
         
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                 
                const responseData = [
                    { id: 1, value: 10 },
                    { id: 2, value: 20 },
                    { id: 3, value: 30 }
                ];
                print('Data fetched:', responseData);
                resolve(responseData);
            }, 1000);
        });
    }

    async processData(url) {
        try {
            this.data = await this.fetchData(url);
             
            const processedData = this.data.map(item => ({
                ...item,
                computedValue: item.value * 2
            })).reduce((acc, curr) => {
                acc.totalValue += curr.computedValue;
                return acc;
            }, { totalValue: 0 });

            print('Processed Data:', processedData);
        } catch (error) {
            console.error('Error processing data:', error);
        }
    }
}

 
const handler = {
    get(target, property) {
        if (property === 'data') {
            print('Data accessed');
        }
        return target[property];
    },
    set(target, property, value) {
        if (property === 'data') {
            print('Data modified');
        }
        target[property] = value;
        return true;
    }
};

 
const processor = new DataProcessor();
const proxiedProcessor = new Proxy(processor, handler);

 
(async () => {
    await proxiedProcessor.processData('https://example.com/api/data');
    print('Final data:', proxiedProcessor.data);
})();
