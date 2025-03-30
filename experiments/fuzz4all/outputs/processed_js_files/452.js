 

const apiSimulation = () => new Promise(resolve => setTimeout(() => resolve({ data: [1, 2, 3, 4, 5] }), 1000));

class DataProcessor {
    constructor() {
        this.data = [];
    }

    async fetchData() {
        try {
            const response = await apiSimulation();
            this.data = response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    processData() {
        const [first, ...rest] = this.data;
        return { first, rest };
    }

    static transform({ first, rest }) {
        return { firstSquared: first ** 2, restDoubled: rest.map(num => num * 2) };
    }
}

const handler = {
    get(target, prop) {
        if (prop in target) {
            print(`Accessing property "${prop}"`);
            return target[prop];
        } else {
            console.warn(`Property "${prop}" not found`);
            return undefined;
        }
    }
};

(async () => {
    const processor = new DataProcessor();
    const proxyProcessor = new Proxy(processor, handler);
    
    await proxyProcessor.fetchData();
    const processedData = proxyProcessor.processData();
    
    print('Processed Data:', processedData);
    
    const transformedData = DataProcessor.transform(processedData);
    print('Transformed Data:', transformedData);
})();
