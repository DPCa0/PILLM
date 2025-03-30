const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

class DataProcessor {
    #data;

    constructor(data) {
        this.#data = data;
    }

    static fromUrl(url) {
        return fetchData(url).then(data => new DataProcessor(data));
    }

    filterData(callback) {
        this.#data = this.#data.filter(callback);
        return this;
    }

    mapData(callback) {
        this.#data = this.#data.map(callback);
        return this;
    }

    reduceData(callback, initialValue) {
        return this.#data.reduce(callback, initialValue);
    }
    
    *[Symbol.iterator]() {
        for (const item of this.#data) {
            yield item;
        }
    }
}

(async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const processor = await DataProcessor.fromUrl(url);

    const wordCount = processor
        .filterData(post => post.userId === 1)
        .mapData(post => post.body)
        .reduceData((count, body) => count + body.split(/\s+/).length, 0);

    print(`Total word count for userId 1: ${wordCount}`);

    print('First 3 posts:');
    for (const post of processor) {
        if (post.id > 3) break;
        print(post.title);
    }
})();
