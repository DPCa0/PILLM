 

class DataFetcher {
    constructor(url) {
        this.url = url;
    }

     
    async fetchData() {
        const response = await fetch(this.url);
        if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
        return await response.json();
    }
}

 
function* dataIterator(data) {
    for (const item of data) {
        yield item;
    }
}

 
const loggerHandler = {
    get: function(target, prop, receiver) {
        print(`Accessing property "${prop}"`);
        return Reflect.get(...arguments);
    }
};

async function processData(url) {
    const fetcher = new DataFetcher(url);

    try {
         
        const data = await fetcher.fetchData();

         
        const proxiedData = new Proxy(data, loggerHandler);

         
        const iterator = dataIterator(proxiedData);
        let result = iterator.next();
        while (!result.done) {
            print(result.value);
            result = iterator.next();
        }

    } catch (error) {
        console.error(`Error processing data: ${error.message}`);
    }
}

 
const exampleURL = "https://jsonplaceholder.typicode.com/posts";
processData(exampleURL);
