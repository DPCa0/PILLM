 

class DataFetcher {
    constructor(url) {
        this.url = url;
    }

    async fetchJson() {
        try {
            let response = await fetch(this.url);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Fetching error:", error);
        }
    }
}

const processData = async (data) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data) {
                resolve(data.map(item => item.toUpperCase()));
            } else {
                reject('No data to process');
            }
        }, 1000);
    });
};

const dataHandler = {
    get: function(target, property) {
        print(`Accessed property: ${property}`);
        return property in target ? target[property] : 'Property does not exist';
    }
};

(async () => {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    const fetcher = new DataFetcher(url);
    let jsonData = await fetcher.fetchJson();

    if (jsonData) {
        let data = await processData(['apple', 'banana', 'cherry']);
        let proxyData = new Proxy(data, dataHandler);

        print(proxyData[0]);  
        print(proxyData[3]);  
    }
})();
