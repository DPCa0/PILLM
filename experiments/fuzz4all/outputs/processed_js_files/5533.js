const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    } catch (error) {
        console.error('Fetching data failed:', error);
    }
};

class DataProcessor {
    #data;

    constructor(data) {
        this.#data = data;
    }

    filterData(condition) {
        return this.#data.filter(condition);
    }

    async *processAndYieldChunks(chunkSize) {
        let index = 0;
        while (index < this.#data.length) {
            yield this.#data.slice(index, index + chunkSize);
            index += chunkSize;
            await new Promise(res => setTimeout(res, 500));  
        }
    }
}

(async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const data = await fetchData(url);
    
    if (data) {
        const processor = new DataProcessor(data);

        const filteredData = processor.filterData(post => post.userId === 1);
        print('Filtered Data:', filteredData);

        print('Processing Data in Chunks:');
        for await (const chunk of processor.processAndYieldChunks(5)) {
            print(chunk);
        }
    }
})();
