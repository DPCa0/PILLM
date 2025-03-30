 

 
function* dataGenerator() {
    yield Promise.resolve({id: 1, value: 'A'});
    yield Promise.resolve({id: 2, value: 'B'});
    yield Promise.resolve({id: 3, value: 'C'});
}

 
class DataProcessor {
    constructor(dataGen) {
        this.dataGen = dataGen;
    }

    async processData() {
        const results = [];
        for (const dataPromise of this.dataGen()) {
            const data = await dataPromise;
            results.push(this.transformData(data));
        }
        return results;
    }

    transformData({id, value}) {
        return `${id}: ${value.toLowerCase()}`;
    }
}

 
function mergeData(...datasets) {
    return datasets.reduce((acc, data) => ({...acc, ...data}), {});
}

 
(async () => {
    const processor = new DataProcessor(dataGenerator);
    const processedData = await processor.processData();
    
     
    print('Processed Data:', processedData);

     
    const data1 = {a: 1, b: 2};
    const data2 = {b: 3, c: 4};
    const mergedData = mergeData(data1, data2);

     
    print('Merged Data:', mergedData);
})();
