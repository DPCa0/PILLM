 
class DataFetcher {
    constructor(url) {
        this.url = url;
    }

    async fetchData() {
        const response = await fetch(this.url);
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        return response.json();
    }
}

const processData = async (url) => {
    try {
        const dataFetcher = new DataFetcher(url);
        const data = await dataFetcher.fetchData();

         
        const { results, ...rest } = data;
        print("Additional Info:", rest);

         
        const uniqueResults = new Set(results.map(item => JSON.stringify(item)));
        const mappedResults = new Map([...uniqueResults].map(item => [JSON.parse(item).id, JSON.parse(item)]));

        for (let [id, item] of mappedResults.entries()) {
            print(`ID: ${id}, Item:`, item);
        }

         
        const processedDataPromises = results.map(async item => {
             
            await new Promise(resolve => setTimeout(resolve, Math.random() * 100));
            return { ...item, processed: true };
        });

        const processedData = await Promise.all(processedDataPromises);
        print("Processed Data:", processedData);

    } catch (error) {
        console.error("An error occurred:", error);
    }
};

 
processData('https://jsonplaceholder.typicode.com/posts');
