 

 
function fetchData(url) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Data from ${url}`);
        }, 1000);
    });
}

 
async function* dataFetcher(urls) {
    for (const url of urls) {
        const data = await fetchData(url);
        yield data;
    }
}

 
const handler = {
    get(target, prop, receiver) {
        print(`Getting ${prop}`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

const dataStore = new Proxy({}, handler);

 
(async () => {
    const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
    const fetcher = dataFetcher(urls);

    for await (const data of fetcher) {
        print(data);
        dataStore[Symbol(data)] = data;  
    }

    print(dataStore);
})();
