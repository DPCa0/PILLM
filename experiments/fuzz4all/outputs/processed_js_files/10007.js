 

class ApiHandler {
    constructor(url) {
        this.url = url;
    }

    async fetchData() {
        try {
            const response = await fetch(this.url);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error(`Failed to fetch data: ${error}`);
            return null;
        }
    }
}

class DataProcessor {
    constructor(data) {
        this.data = data;
    }

    process() {
        if (!this.data) return [];
        return this.data.map(({ id, name, email }) => ({
            id,
            name: name.toUpperCase(),
            email,
        }));
    }
}

(async () => {
    const urls = [
        'https://jsonplaceholder.typicode.com/users/1',
        'https://jsonplaceholder.typicode.com/users/2',
        'https://jsonplaceholder.typicode.com/users/3'
    ];

    try {
         
        const results = await Promise.all(urls.map(url => new ApiHandler(url).fetchData()));

         
        const processedResults = results.map(result => new DataProcessor(result).process());

         
        processedResults.forEach(result => {
            result.forEach(({ id, name, email }) => {
                print(`ID: ${id}, Name: ${name}, Email: ${email}`);
            });
        });
    } catch (error) {
        console.error(`Error during processing: ${error}`);
    }
})();
