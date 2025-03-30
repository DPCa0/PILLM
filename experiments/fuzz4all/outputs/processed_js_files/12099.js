class DataPipeline {
    #rawData;
    constructor(data) {
        this.#rawData = data;
    }

    async processData() {
        const cleanData = await this.#cleanData(this.#rawData);
        const transformedData = this.#transformData(cleanData);
        return this.#aggregateData(transformedData);
    }

    async #cleanData(data) {
         
        return new Promise((resolve) => {
            setTimeout(() => {
                const cleaned = data.filter(item => item != null);
                resolve(cleaned);
            }, 1000);
        });
    }

    #transformData(data) {
         
        return data.map(item => ({ value: item * 2, isEven: item % 2 === 0 }))
                   .reduce((acc, curr) => {
                       acc.even.push(curr.isEven ? curr.value : 0);
                       acc.odd.push(!curr.isEven ? curr.value : 0);
                       return acc;
                   }, { even: [], odd: [] });
    }

    #aggregateData(data) {
         
        const { even, odd } = data;
        const sumEven = even.reduce((sum, num) => sum + num, 0);
        const sumOdd = odd.reduce((sum, num) => sum + num, 0);
        return { sumEven, sumOdd };
    }
}

 
const data = [1, 2, 3, 4, 5, null, 6, 7, 8];

 
(async () => {
    const pipeline = new DataPipeline(data);
    const result = await pipeline.processData();
    print(result);  
})();
