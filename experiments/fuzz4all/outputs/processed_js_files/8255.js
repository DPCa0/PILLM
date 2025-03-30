Certainly! Below is a JavaScript program utilizing advanced features such as Promises, async/await, destructuring, rest/spread operators, and classes:

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
            console.error('Fetch error:', error);
            throw error;
        }
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const processUserData = async (fetcher, endpoint) => {
    try {
        print('Fetching data...');
        const data = await fetcher.fetchData(endpoint);
        
         
        const [{ name, ...rest }] = data.users;
        print(`Name: ${name}`, rest);

        await delay(1000);
        print('Processing complete');
    } catch (error) {
        console.error('Error processing user data:', error);
    }
};

(async () => {
    const API_URL = 'https://jsonplaceholder.typicode.com';
    const fetcher = new DataFetcher(API_URL);

    try {
        await processUserData(fetcher, 'users');
    } catch (error) {
        console.error('Main error:', error);
    }
})();

This program defines a `DataFetcher` class for fetching data from an API using `fetch` and `async/await`. It utilizes destructuring to extract user details, the rest operator to gather remaining object properties, and introduces a delay using Promises to simulate data processing time.