const fs = require('fs').promises;

class DataProcessor {
    #data;
    
    constructor(data) {
        this.#data = data;
    }

    static async fetchData() {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        return response.json();
    }
    
    processData() {
        return this.#data.map(({ id, title }) => ({ id, titleLength: title.length }));
    }
}

(async () => {
    try {
         
        const rawData = await DataProcessor.fetchData();
        
         
        const processor = new DataProcessor(rawData);
        const processedData = processor.processData();
        
         
        const formattedData = JSON.stringify(processedData, null, 2);
        
         
        await fs.writeFile('processedData.json', formattedData);
        
        print('Data processing complete and saved to file.');
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
