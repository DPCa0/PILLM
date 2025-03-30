class ComplexData {
    #privateData;

    constructor(data) {
        this.#privateData = data;
    }

    async *generateData() {
        for (let i = 0; i < this.#privateData.length; i++) {
            yield new Promise((resolve) =>
                setTimeout(() => resolve(this.#privateData[i]), 100)
            );
        }
    }

    static deepClone(obj) {
        return structuredClone(obj);
    }
}

const processData = async (data) => {
    const clonedData = ComplexData.deepClone(data);
    const complexData = new ComplexData(clonedData);
    const results = [];

    for await (const item of complexData.generateData()) {
        results.push(item * 2);
    }

    return results;
};

(async () => {
    const originalData = [1, 2, 3, 4, 5];
    const processedData = await processData(originalData);
    print('Original Data:', originalData);
    print('Processed Data:', processedData);
})();
