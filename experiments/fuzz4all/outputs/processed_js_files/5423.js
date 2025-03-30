const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

class DataProcessor {
    constructor(data) {
        this.data = data;
    }

    static filterData(data, predicate) {
        return data.filter(predicate);
    }

    *reverseGenerator() {
        for (let i = this.data.length - 1; i >= 0; i--) {
            yield this.data[i];
        }
    }

    transformData(transformFn) {
        return this.data.map(transformFn);
    }
}

(async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const rawData = await fetchData(url);
    
    if (!rawData) return;

    const processor = new DataProcessor(rawData);
    const filteredData = DataProcessor.filterData(rawData, item => item.userId === 1);
    const transformedData = processor.transformData(item => ({...item, title: item.title.toUpperCase()}));

    print('Filtered Data:', filteredData);
    print('Transformed Data:', transformedData);

    print('Reversed Data:');
    for (const item of processor.reverseGenerator()) {
        print(item);
    }
})();
