const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

class DataProcessor {
    constructor(data) {
        this.data = data;
    }

    filterBy(criteria) {
        return this.data.filter(item => criteria(item));
    }

    transform(mapper) {
        return this.data.map(mapper);
    }
}

(async () => {
    try {
        const url = 'https://jsonplaceholder.typicode.com/posts';
        const data = await fetchData(url);

        const processor = new DataProcessor(data);
        const filteredData = processor.filterBy(item => item.userId === 1);
        const transformedData = processor.transform(item => ({
            title: item.title.toUpperCase(),
            bodySnippet: item.body.slice(0, 50) + '...'
        }));

        print(transformedData);
    } catch (error) {
        console.error('Error:', error);
    }
})();
