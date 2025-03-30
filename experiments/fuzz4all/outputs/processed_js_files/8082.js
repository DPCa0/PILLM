 

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { message: 'Hello, advanced world!' };
            resolve(data);
        }, 1000);
    });
}

 
const handler = {
    get: (target, property) => {
        print(`Property "${property}" has been accessed.`);
        return Reflect.get(target, property);
    }
};

 
const urlMap = new Map();
urlMap.set('https://example.com/api', { userId: 123, token: 'abcXYZ' });

async function getDataFromUrl(url) {
    if (!urlMap.has(url)) {
        console.error('URL not found in the Map.');
        return;
    }

    const proxyData = new Proxy(urlMap.get(url), handler);
    print(`Fetching data for User ID: ${proxyData.userId}`);

    try {
        const response = await fetchData(url);
        print(response.message);
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}

getDataFromUrl('https://example.com/api');
