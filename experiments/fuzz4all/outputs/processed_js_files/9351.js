const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

class DataCache {
    constructor() {
        this.cache = new Map();
    }
    get(key) {
        return this.cache.has(key) ? Promise.resolve(this.cache.get(key)) : null;
    }
    set(key, value) {
        this.cache.set(key, value);
    }
}

const debounced = (func, delay) => {
    let timeoutId;
    return function(...args) {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

(async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const cache = new DataCache();

    const fetchWithCache = async (url) => {
        const cachedData = await cache.get(url);
        if (cachedData) {
            print('Serving from cache');
            return cachedData;
        } else {
            const data = await fetchData(url);
            cache.set(url, data);
            return data;
        }
    };

    const displayData = async () => {
        const data = await fetchWithCache(url);
        print(data);
    };

    const debouncedDisplayData = debounced(displayData, 1000);

    debouncedDisplayData();
    debouncedDisplayData();  
    setTimeout(debouncedDisplayData, 1500);  

})();
