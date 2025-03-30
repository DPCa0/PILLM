const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

class DataProcessor {
    #data;
    
    constructor(data) {
        this.#data = data;
    }
    
    static processData(data) {
        return data.map(item => ({
            ...item,
            fullName: `${item.firstName} ${item.lastName}`.toUpperCase()
        }));
    }
    
    filterData(callback) {
        return this.#data.filter(callback);
    }
}

(async () => {
    try {
        const url = 'https://jsonplaceholder.typicode.com/users';
        const data = await fetchData(url);
        const processedData = DataProcessor.processData(data);
        const dataProcessor = new DataProcessor(processedData);
        
        const filteredData = dataProcessor.filterData(user => user.email.includes('.org'));
        
        filteredData.forEach(user => {
            print(`Name: ${user.fullName}, Email: ${user.email}`);
        });
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
})();
