class DataProcessor {
    constructor(data) {
        this.data = data;
    }

    *[Symbol.iterator]() {
        for (const item of this.data) {
            yield item;
        }
    }

    static async fetchData(url) {
        const response = await fetch(url);
        const json = await response.json();
        return new DataProcessor(json);
    }

    filterData(predicate) {
        this.data = this.data.filter(predicate);
        return this;
    }

    async processAsync(callback) {
        for await (const item of this.data) {
            await callback(item);
        }
    }
}

(async () => {
    try {
        const processor = await DataProcessor.fetchData('https://jsonplaceholder.typicode.com/posts');

        processor
            .filterData(post => post.userId === 1)
            .processAsync(async post => {
                print(`Post ID: ${post.id}, Title: ${post.title}`);
                await new Promise(resolve => setTimeout(resolve, 500));  
            });
    } catch (error) {
        console.error('Error processing data:', error);
    }
})();
