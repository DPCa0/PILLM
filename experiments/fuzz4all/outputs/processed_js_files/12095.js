 
const dataFetcher = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === 'https://api.example.com/data') {
                resolve({ data: 'Sample data from API' });
            } else {
                reject(new Error('Invalid URL'));
            }
        }, 1000);
    });
};

const dataProxyHandler = {
    get: (target, property) => {
        return property in target ? target[property] : 'Property not found';
    },
    set: (target, property, value) => {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

const dataManager = async (url) => {
    const dataStore = new Proxy({}, dataProxyHandler);
    try {
        const response = await dataFetcher(url);
        dataStore.data = response.data;
        print(`Fetched data: ${dataStore.data}`);
    } catch (error) {
        console.error(error.message);
    }

    print(`Attempting to access a non-existing property: ${dataStore.nonExisting}`);
};

dataManager('https://api.example.com/data');
