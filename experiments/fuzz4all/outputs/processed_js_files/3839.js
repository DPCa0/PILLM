class AsyncDataProcessor {
    constructor(data) {
        this.data = data;
    }

    async processData() {
        const results = await Promise.all(this.data.map(async item => {
            const transformed = await this._transform(item);
            const validated = this._validate(transformed);
            return validated ? transformed : null;
        }));
        return results.filter(item => item !== null);
    }

    _transform(item) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(item * 2);
            }, Math.random() * 1000);
        });
    }

    _validate(item) {
        return item % 3 === 0;
    }
}

(async () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const processor = new AsyncDataProcessor(data);
    const result = await processor.processData();
    print("Processed and validated data:", result);
})();
