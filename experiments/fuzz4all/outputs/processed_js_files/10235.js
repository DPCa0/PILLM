const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

class DataProcessor {
    constructor(data) {
        this.data = data;
    }

    *processData() {
        for (let item of this.data) {
            yield this.transformData(item);
        }
    }

    transformData(item) {
        return Object.fromEntries(
            Object.entries(item).map(([key, value]) => [key.toUpperCase(), typeof value === 'string' ? value.toUpperCase() : value])
        );
    }
}

(async () => {
    const data = await fetchData('https://api.example.com/data');
    if (!data) return;
    
    const dataProcessor = new DataProcessor(data);
    const processedData = [...dataProcessor.processData()];

    const uniqueKeys = new Set(processedData.flatMap(Object.keys));
    const reducedData = processedData.reduce((acc, cur) => {
        uniqueKeys.forEach(key => {
            if (!acc[key]) acc[key] = [];
            if (cur[key] !== undefined) acc[key].push(cur[key]);
        });
        return acc;
    }, {});

    print('Unique Keys:', uniqueKeys);
    print('Reduced Data:', reducedData);
})();
