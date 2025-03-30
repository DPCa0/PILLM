const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return response.json();
};

const processData = (data) => {
    return data.map(item => ({...item, processed: true}))
               .filter(item => item.value > 10)
               .reduce((acc, item) => (acc += item.value, acc), 0);
};

const displayResult = (result) => {
    print(`The processed result is: ${result}`);
};

const cacheData = (function() {
    const cache = new Map();
    return async (url, fetchDataFn) => {
        if (cache.has(url)) {
            print('Fetching from cache');
            return cache.get(url);
        } else {
            print('Fetching from network');
            const data = await fetchDataFn(url);
            cache.set(url, data);
            return data;
        }
    };
})();

(async () => {
    try {
        const url = 'https://api.example.com/data';
        const data = await cacheData(url, fetchData);
        const result = processData(data);
        displayResult(result);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
})();
