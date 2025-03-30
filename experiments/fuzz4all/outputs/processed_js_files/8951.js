class DataPipeline {
    constructor(data) {
        this.data = data;
    }

    async process() {
        const transformedData = await this.transform(this.data);
        const filteredData = this.filter(transformedData);
        const reducedData = this.reduce(filteredData);
        print('Final Result:', reducedData);
    }

    async transform(data) {
        return new Promise(resolve => {
            setTimeout(() => {
                print('Transforming Data...');
                const transformed = data.map(x => x * 2);
                resolve(transformed);
            }, 1000);
        });
    }

    filter(data) {
        print('Filtering Data...');
        return data.filter(x => x > 10);
    }

    reduce(data) {
        print('Reducing Data...');
        return data.reduce((acc, val) => acc + val, 0);
    }
}

 
const dataHandler = {
    get(target, prop, receiver) {
        if (prop in target) {
            print(`Accessing property "${prop}" with value "${target[prop]}"`);
            return Reflect.get(...arguments);
        } else {
            print(`Property "${prop}" not found`);
            return undefined;
        }
    }
};

const data = [1, 5, 7, 3, 10, 12];
const proxyData = new Proxy(data, dataHandler);

const pipeline = new DataPipeline(proxyData);
pipeline.process();
