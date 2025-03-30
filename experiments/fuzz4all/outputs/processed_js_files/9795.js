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

    process() {
        return this.data.map(item => ({ ...item, processed: true }));
    }
}

const main = async () => {
    try {
        const url = 'https://jsonplaceholder.typicode.com/posts';
        const rawData = await fetchData(url);
        
        const processor = new DataProcessor(rawData);
        const processedData = processor.process();

        const maxData = processedData.reduce((max, item) => item.id > max.id ? item : max, processedData[0]);
        
        print('Max Data Item:', maxData);
    } catch (error) {
        console.error('Error:', error);
    }
};

main();
