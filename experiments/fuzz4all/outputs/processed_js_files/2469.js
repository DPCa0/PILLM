 

 
async function fetchData(url) {
    const response = await fetch(url);
    return await response.json();
}

 
function* urlGenerator(urls) {
    for (let url of urls) {
        yield url;
    }
}

 
const handler = {
    get: function(target, prop) {
        if (prop in target) {
            print(`Getting ${prop}`);
            return target[prop];
        } else {
            print(`${prop} does not exist on target`);
            return undefined;
        }
    }
};

 
class DataFetcher {
    constructor(urls) {
        this.urls = urls;
    }
    
    async fetchAll() {
        let results = [];
        for (let url of urlGenerator(this.urls)) {
            const data = await fetchData(url);
            results.push(data);
        }
        return new Proxy(results, handler);
    }
}

 
(async function() {
    const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
    const dataFetcher = new DataFetcher(urls);

    const results = await dataFetcher.fetchAll();
    print(results[0]);  
    print(results[1]);  
    print(results[2]);  
})();
