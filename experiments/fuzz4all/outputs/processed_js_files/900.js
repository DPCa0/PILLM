class DataFetcher {
    constructor(url) {
        this.url = url;
    }

    async fetchData() {
        const response = await fetch(this.url);
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    }
}

const processData = async (url) => {
    try {
        const dataFetcher = new DataFetcher(url);
        const data = await dataFetcher.fetchData();

        const transformedData = data.map(item => ({
            ...item,
            timestamp: new Date().toISOString()
        }));

        const sortedData = transformedData.sort((a, b) => a.value - b.value);

        const [topItem] = sortedData;
        print(`Top Item: ${JSON.stringify(topItem, null, 2)}`);

        const filteredData = sortedData.filter(({ value }) => value > 50);
        print(`Filtered Data: ${JSON.stringify(filteredData, null, 2)}`);

        const resultSet = new Set(filteredData.map(item => item.category));
        print(`Unique Categories: ${[...resultSet].join(', ')}`);

    } catch (error) {
        console.error('Error processing data:', error);
    }
};

 
processData('https://jsonplaceholder.typicode.com/posts');
