 

class DataFetcher {
    constructor(apiEndpoint) {
        this.apiEndpoint = apiEndpoint;
    }

    async fetchData() {
        try {
            const response = await fetch(this.apiEndpoint);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    }
}

class DataProcessor {
    static async process(apiEndpoint) {
        const fetcher = new DataFetcher(apiEndpoint);
        const data = await fetcher.fetchData();
        
        if (!data) return;

         
        const { user, metadata: { createdAt } } = data;
        const { name, email } = user;

        print(`User ${name} (${email}) created at ${new Date(createdAt).toLocaleString()}`);
    }
}

(async () => {
    const apiEndpoint = 'https://jsonplaceholder.typicode.com/users/1';
    
     
    await Promise.all([
        DataProcessor.process(apiEndpoint),
        DataProcessor.process(apiEndpoint),
    ]);
})();
