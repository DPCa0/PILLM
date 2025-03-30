 

class DataService {
    async fetchData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Error fetching data: ${response.statusText}`);
            return await response.json();
        } catch (error) {
            console.error(`fetchData: ${error.message}`);
        }
    }
}

function processData({ name, age, location: { city, country } }) {
    print(`Processing data for ${name}, ${age} years old, from ${city}, ${country}.`);
}

async function execute() {
    const url = 'https://api.example.com/user';
    const dataService = new DataService();
    
    const [user1, user2, user3] = await Promise.all([
        dataService.fetchData(url + '/1'),
        dataService.fetchData(url + '/2'),
        dataService.fetchData(url + '/3')
    ]);

    if (user1) processData(user1);
    if (user2) processData(user2);
    if (user3) processData(user3);
}

execute();
