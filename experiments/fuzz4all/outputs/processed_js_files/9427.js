 

 
const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === 'https://api.example.com/data') {
                resolve({ id: 1, name: 'Sample Data', details: { category: 'example', value: 42 } });
            } else {
                reject('Invalid URL');
            }
        }, 1000);
    });
};

 
class DataManager {
    constructor(data) {
        this.data = data;
    }

     
    static async fetchDataAndProcess(url) {
        try {
            const response = await fetchData(url);
            return DataManager.processData(response);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

     
    static processData(data) {
         
        const { id, name, details: { category, value } } = data;
        return new DataManager({ id, name, category, value });
    }

     
    displayData() {
        print(`Data ID: ${this.data.id}`);
        print(`Name: ${this.data.name}`);
        print(`Category: ${this.data.category}`);
        print(`Value: ${this.data.value}`);
    }
}

 
(async () => {
    const dataManager = await DataManager.fetchDataAndProcess('https://api.example.com/data');
    dataManager.displayData();
})();
