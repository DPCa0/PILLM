 

class DataFetcher {
    constructor(apiEndpoint) {
        this.apiEndpoint = apiEndpoint;
    }
    
    async fetchData() {
         
        const response = await fetch(this.apiEndpoint);
        const data = await response.json();
        return data;
    }
}

async function processData(apiUrl) {
    const dataFetcher = new DataFetcher(apiUrl);
    try {
        const data = await dataFetcher.fetchData();
        
         
        const results = data.results.map(({ name, id, details }) => ({
            id,
            fullName: `${name.first} ${name.last}`,
            details
        }));
        
        results.forEach(({ id, fullName, details }) => {
             
            print(`ID: ${id}\nName: ${fullName}\nDetails: ${details}\n`);
        });
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
}

 
processData('https://api.example.com/data');
