 

 
function* fibonacci(limit) {
    let [prev, curr] = [0, 1];
    while (curr <= limit) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

 
const fetchData = async (url) => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(1000);  
    return `Data from ${url}`;  
};

 
const fetchAllData = async (urls) => {
    const results = await Promise.allSettled(urls.map((url) => fetchData(url)));
    return results.map((result) =>
        result.status === 'fulfilled' ? result.value : 'Error fetching data'
    );
};

 
const logger = {
    log: [],
    get(target, property) {
        const value = target[property];
        this.log.push(`Accessed ${property}: ${value}`);
        return value;
    },
    set(target, property, value) {
        this.log.push(`Set ${property} to ${value}`);
        target[property] = value;
        return true;
    },
};

 
const dataStore = { name: 'JS Learner', level: 'Intermediate' };
const proxiedStore = new Proxy(dataStore, logger);

 
(async () => {
    print('Fibonacci sequence:');
    for (const num of fibonacci(21)) {
        print(num);
    }

    const urls = ['http://example.com/api/data1', 'http://example.com/api/data2'];
    const dataResults = await fetchAllData(urls);
    print('Fetched data:', dataResults);

     
    print('Proxied data store operations:');
    proxiedStore.name = 'Advanced JS Expert';
    print(proxiedStore.name);
    print('Log:', logger.log);
})();
