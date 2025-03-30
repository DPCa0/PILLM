class ComplexOperation {
    static async fetchData(url) {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
    }

    constructor(data) {
        this.data = data;
    }

    *dataGenerator() {
        for (const item of this.data) {
            yield item;
        }
    }

    async processDataAsync(callback) {
        const processedData = this.data.map(callback);
        return Promise.all(processedData);
    }

    static compose(...fns) {
        return (arg) => fns.reduceRight((prev, fn) => fn(prev), arg);
    }
}

(async () => {
    try {
        const dataUrl = "https://jsonplaceholder.typicode.com/posts";
        const rawData = await ComplexOperation.fetchData(dataUrl);

        const complexOp = new ComplexOperation(rawData);

        const doubledIds = await complexOp.processDataAsync(async post => {
            await new Promise(resolve => setTimeout(resolve, 50));  
            return { ...post, id: post.id * 2 };
        });

        const generator = complexOp.dataGenerator();

        print("Iterating over data using generator:");
        let result = generator.next();
        while (!result.done) {
            print(result.value);
            result = generator.next();
        }

        const doubleId = post => ({ ...post, id: post.id * 2 });
        const addTitleSuffix = post => ({ ...post, title: post.title + " - Processed" });

        const enhanceData = ComplexOperation.compose(addTitleSuffix, doubleId);

        print("Enhanced Data:", doubledIds.map(enhanceData));
    } catch (error) {
        console.error("Error:", error);
    }
})();
