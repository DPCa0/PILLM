 
class DataProcessor {
    constructor(data) {
        this.data = data;
    }

    async processData() {
         
        const additionalData = await this.fetchAdditionalData();
        
         
        const { transformedData, metadata } = this.transformData(additionalData);
        
         
        const uniqueValues = new Set(transformedData);
        
         
        const resultMap = new Map();
        uniqueValues.forEach(value => {
            resultMap.set(value, this.computeComplexLogic(value, metadata));
        });

        return this.formatResults(resultMap);
    }

    fetchAdditionalData() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(['extra', 'data', 'to', 'process']);
            }, 1000);
        });
    }

    transformData(additionalData) {
        const mergedData = [...this.data, ...additionalData];
        const transformedData = mergedData.map(item => item.toUpperCase());
        const metadata = { itemCount: transformedData.length };
        return { transformedData, metadata };
    }

    computeComplexLogic(value, metadata) {
         
        return `${value} has ${metadata.itemCount} siblings`;
    }

    formatResults(resultMap) {
         
        return Array.from(resultMap)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n');
    }
}

 
(async () => {
    const processor = new DataProcessor(['hello', 'world']);
    print(await processor.processData());
})();
