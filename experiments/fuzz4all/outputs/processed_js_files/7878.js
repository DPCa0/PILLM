class ComplexOperation {
    constructor(data) {
        this.data = data;
    }

    *filterData(predicate) {
        for (const item of this.data) {
            if (predicate(item)) yield item;
        }
    }

    async processData() {
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        const result = [];
        for (const item of this.filterData(x => x % 2 === 0)) {
            await delay(100);  
            result.push(item * item);
        }
        
        return result;
    }
}

const inputArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

(async () => {
    try {
        const operation = new ComplexOperation(inputArray);
        const processedData = await operation.processData();

        const newArray = processedData.map((value, index) => ({ index, value }));
        const finalResult = Object.fromEntries(newArray.map(item => [item.index, item.value]));

        print(finalResult);  
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
