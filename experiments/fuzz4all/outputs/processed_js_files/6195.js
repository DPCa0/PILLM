 

 
const simulateAPICall = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.1) {
                resolve(`Data from ${url}`);
            } else {
                reject(`Error fetching data from ${url}`);
            }
        }, 1000);
    });
};

 
class DataFetcher {
    constructor(urls) {
        this.urls = urls;
    }

    async fetchData() {
        try {
             
            const dataPromises = this.urls.map(url => simulateAPICall(url));
            const data = await Promise.all(dataPromises);

            print('Data fetched successfully:', data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}

 
const urls = [
    'https://api.example.com/data1',
    'https://api.example.com/data2',
    'https://api.example.com/data3'
];

 
const dataFetcher = new DataFetcher(urls);
dataFetcher.fetchData();

 
const uniqueDataSources = new Set(['source1', 'source2', 'source3']);
uniqueDataSources.add('source4');
const additionalSources = ['source5', 'source6'];
const allSources = [...uniqueDataSources, ...additionalSources];

print('All data sources:', allSources);

 
const user = { name: 'Alice', age: 25, role: 'developer' };
const { name, age, role } = user;
print(`User Info: Name - ${name}, Age - ${age}, Role - ${role}`);
