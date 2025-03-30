 

 
const fetchData = async (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.2) {
                resolve({ data: `Data from ${url}` });
            } else {
                reject(new Error(`Failed to fetch data from ${url}`));
            }
        }, 1000);
    });
};

 
const handler = {
    get: (target, prop) => {
        print(`Accessed property: ${prop}`);
        return target[prop];
    },
    set: (target, prop, value) => {
        print(`Setting property: ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

const dataStore = new Proxy({}, handler);

 
function* urlGenerator() {
    const urls = ['https://api.example.com/data1', 'https://api.example.com/data2', 'https://api.example.com/data3'];
    for (let url of urls) {
        yield url;
    }
}

const processUrls = async () => {
    const gen = urlGenerator();
    for (let url of gen) {
        try {
            const result = await fetchData(url);
            dataStore[url] = result.data;
            print(`Fetched and stored: ${result.data}`);
        } catch (error) {
            console.error(error.message);
        }
    }
    print('All URLs processed.');
};

 
(async () => {
    await processUrls();
    print('Final Data Store:', dataStore);
})();
