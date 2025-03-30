 
 

class DataFetcher {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    async fetchData(endpoint) {
        try {
            const response = await fetch(`${this.apiUrl}/${endpoint}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Fetch error: ${error}`);
        }
    }
}

function* dataProcessor(dataArray) {
    for (const data of dataArray) {
        yield `${data.id}: ${data.name}`;
    }
}

async function displayData() {
    const apiURL = 'https://jsonplaceholder.typicode.com';
    const fetcher = new DataFetcher(apiURL);
    
    const usersData = await fetcher.fetchData('users');
    
    if (usersData) {
        const userProcessor = dataProcessor(usersData);

        for (const userInfo of userProcessor) {
            print(userInfo);
        }
    }
}

displayData();
