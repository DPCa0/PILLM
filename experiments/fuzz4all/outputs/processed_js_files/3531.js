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

const processData = (data) => {
    return data.map(item => ({
        ...item,
        fullName: `${item.firstName} ${item.lastName}`.toUpperCase(),
        isActive: item.status === 'active'
    }));
};

const executePipeline = async (url) => {
    const data = await fetchData(url);
    const processedData = processData(data);
    const activeUsers = processedData.filter(user => user.isActive);

    activeUsers.forEach(user => {
        print(`Active User: ${user.fullName}`);
    });
};

const memoize = (fn) => {
    const cache = new Map();
    return async (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            print('Fetching from cache');
            return cache.get(key);
        }
        const result = await fn(...args);
        cache.set(key, result);
        return result;
    };
};

const memoizedExecutePipeline = memoize(executePipeline);

 
 
