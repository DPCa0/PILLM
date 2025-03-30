 

 
const fetchData = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        Math.random() > 0.2 ? resolve({ data: [1, 2, 3, 4, 5] }) : reject(new Error("Failed to fetch data"));
    }, 1000);
});

 
class FetchError extends Error {
    constructor(message) {
        super(message);
        this.name = "FetchError";
    }
}

 
class DataProcessor {
    constructor(data) {
        this.data = data;
    }

     
    processData() {
        return this.data.map(num => num * 2).filter(num => num > 5);
    }
}

 
const handleData = async () => {
    try {
        const response = await fetchData();
        const processor = new DataProcessor(response.data);
        const processedData = processor.processData();
        
        print(`Processed Data: ${processedData.join(', ')}`);
    } catch (error) {
        if (error instanceof FetchError) {
            console.error(`FetchError: ${error.message}`);
        } else {
            console.error(`Unexpected Error: ${error.message}`);
        }
    }
};

 
handleData();
