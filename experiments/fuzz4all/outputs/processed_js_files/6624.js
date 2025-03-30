 
 

class DataProcessor {
    constructor(data) {
        this.data = data;
    }

    static async fetchData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }

    processData() {
        const { data } = this;
        return data.map(item => {
            const { id, value } = item;
            return { id, processedValue: value * 2 };
        });
    }

    logData(...args) {
        print('Logging Data:', ...args);
    }
}

(async () => {
    const url = 'https://api.example.com/data';  
    const data = await DataProcessor.fetchData(url);
    
    if (data) {
        const processor = new DataProcessor(data);
        const processedData = processor.processData();
        processor.logData(...processedData);
    }
})();
