 

 
 

class DataProcessor {
    constructor(data) {
        this.data = data;
    }
    
    async fetchData() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.data ? resolve(this.data) : reject('No data found');
            }, 1000);
        });
    }

    processData() {
        return this.data.map(item => ({ ...item, processed: true }));
    }
}

const getDataAsync = async () => {
    try {
        const initialData = [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
            { id: 3, name: 'Charlie' }
        ];
        
        const dataProcessor = new DataProcessor(initialData);
        const data = await dataProcessor.fetchData();
        
        const processedData = dataProcessor.processData();
        return processedData;
        
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

const displayData = (data) => {
    const { log } = console;
    data.forEach(({ id, name, processed }) => {
        log(`ID: ${id}, Name: ${name}, Processed: ${processed}`);
    });
};

getDataAsync().then(displayData);
