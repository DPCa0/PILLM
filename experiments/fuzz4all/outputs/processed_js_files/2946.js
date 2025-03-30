class DataPipeline {
    #transformations = [];
    #data = [];

    constructor(data) {
        this.#data = data;
    }

    addTransformation(transformFn) {
        this.#transformations.push(transformFn);
        return this;
    }

    async *#asyncGenerator(data) {
        for (let item of data) {
            yield await new Promise(resolve => setTimeout(() => resolve(item), Math.random() * 1000));
        }
    }

    execute() {
        return (async () => {
            const results = [];
            for await (let item of this.#asyncGenerator(this.#data)) {
                let transformedItem = item;
                for (let transform of this.#transformations) {
                    transformedItem = transform(transformedItem);
                }
                results.push(transformedItem);
            }
            return results;
        })();
    }
}

const data = [1, 2, 3, 4, 5];

const pipeline = new DataPipeline(data);

pipeline
    .addTransformation(x => x * 2)
    .addTransformation(x => x + 1)
    .addTransformation(x => x ** 2);

pipeline.execute().then(result => print(result));

 
