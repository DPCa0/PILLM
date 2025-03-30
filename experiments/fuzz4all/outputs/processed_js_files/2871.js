 
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

 
const dataHandler = {
    get: (target, property) => {
        print(`Accessing property ${property}`);
        return target[property];
    }
};

 
async function handleMultipleRequests(urls) {
    try {
        const fetchPromises = urls.map(url => fetchData(url));
        const results = await Promise.allSettled(fetchPromises);
        return results.map((result, index) => {
            if (result.status === 'fulfilled') {
                return { url: urls[index], data: new Proxy(result.value, dataHandler) };
            } else {
                return { url: urls[index], error: result.reason };
            }
        });
    } catch (error) {
        console.error('Error in handling requests:', error);
    }
}

 
function complexArrayTransformation(data) {
    return data
        .filter(item => item.data)  
        .flatMap(item => Object.entries(item.data))  
        .reduce((acc, [key, value]) => {
            acc[key] = (acc[key] || 0) + value;  
            return acc;
        }, {});
}

 
(async () => {
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
        'https://jsonplaceholder.typicode.com/invalid-url'
    ];

    const results = await handleMultipleRequests(urls);
    print('Processed Results:', complexArrayTransformation(results));
})();
