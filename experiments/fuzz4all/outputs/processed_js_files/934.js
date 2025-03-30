const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
};

class DataProcessor {
    constructor(data) {
        this.data = data;
    }

    filterByCondition(conditionFn) {
        return this.data.filter(conditionFn);
    }

    sortData(sortFn) {
        return this.data.sort(sortFn);
    }

    async processAndDisplay(transformFn) {
        const transformedData = this.data.map(transformFn);
        print(transformedData);
    }
}

(async () => {
    try {
        const url = 'https://jsonplaceholder.typicode.com/posts';
        const rawData = await fetchData(url);

        const processor = new DataProcessor(rawData);
        const filteredData = processor.filterByCondition(item => item.id % 2 === 0);
        
        const sortFn = (a, b) => a.title.localeCompare(b.title);
        const sortedData = processor.sortData(sortFn);
        
        await processor.processAndDisplay(item => ({
            id: item.id,
            title: item.title.toUpperCase(),
            shortBody: item.body.substring(0, 50)
        }));
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
})();
