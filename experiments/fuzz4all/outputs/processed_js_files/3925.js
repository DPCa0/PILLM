 

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url) {
                resolve({ data: `Data from ${url}` });
            } else {
                reject('Invalid URL');
            }
        }, 1000);
    });
}

 
async function fetchWithRetry(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetchData(url);
            return response;
        } catch (error) {
            if (i === retries - 1) throw error;
        }
    }
}

 
const dataStore = new Map();

 
const handler = {
    get: (target, property) => {
        print(`Accessing data for URL: ${property}`);
        return target.get(property);
    },
    set: (target, property, value) => {
        print(`Storing data for URL: ${property}`);
        target.set(property, value);
        return true;
    }
};

const dataProxy = new Proxy(dataStore, handler);

 
async function demo(url) {
    try {
        const data = await fetchWithRetry(url);
        dataProxy[url] = data.data;
        print(dataProxy[url]);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
demo('https://api.example.com/resource1');
demo('https://api.example.com/resource2');
demo('');  
