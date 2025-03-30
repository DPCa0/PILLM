 
class DataProcessor {
    constructor(data) {
        this.data = data;
    }

    async fetchData(endpoint) {
        try {
            let response = await fetch(endpoint);
            if (!response.ok) throw new Error('Network response was not ok');
            let jsonData = await response.json();
            return jsonData;
        } catch (error) {
            console.error('Fetching data failed:', error);
            return [];
        }
    }

    processData() {
        return this.data.map(({ id, ...rest }) => ({ identifier: id, ...rest }));
    }

    async integrateData(newData) {
        this.data = [...this.data, ...newData];
    }

    displayData() {
        print(this.processData());
    }
}

 
(async () => {
    const initialData = [
        { id: 1, name: 'Alice', value: 42 },
        { id: 2, name: 'Bob', value: 36 }
    ];

    const processor = new DataProcessor(initialData);
    const newData = await processor.fetchData('https://jsonplaceholder.typicode.com/posts');
    
     
    const filteredNewData = newData.slice(0, 3).map(({ id, title }) => ({ id, name: title, value: Math.random() * 100 }));
    
    await processor.integrateData(filteredNewData);
    processor.displayData();
})();
