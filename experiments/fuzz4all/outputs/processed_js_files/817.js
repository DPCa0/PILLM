const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

const processData = ({ data }) => {
    return data.filter(item => item.isActive)
               .map(({ id, value }) => ({ id, transformedValue: value * 2 }))
               .reduce((acc, item) => ({ ...acc, [item.id]: item.transformedValue }), {});
};

const cacheResults = new Map();

const memoize = (fn) => {
    return async (...args) => {
        const key = JSON.stringify(args);
        if (cacheResults.has(key)) return cacheResults.get(key);
        const result = await fn(...args);
        cacheResults.set(key, result);
        return result;
    };
};

const cachedFetchData = memoize(fetchData);

(async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const rawData = await cachedFetchData(url);
    if (rawData) {
        const processedData = processData({ data: rawData });
        print('Processed Data:', processedData);
    }
})();
