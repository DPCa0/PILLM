 

 
const fetchData = (url) => new Promise((resolve, reject) => {
    setTimeout(() => {
        const mockData = { data: `Data from ${url}` };
        url ? resolve(mockData) : reject('URL not provided');
    }, 1000);
});

 
async function fetchMultipleData(urls) {
    try {
        const results = await Promise.all(urls.map(url => fetchData(url)));
        return results;
    } catch (error) {
        throw new Error(error);
    }
}

 
const resultHandler = {
    get: (target, prop) => {
        if (prop in target) {
            return target[prop];
        } else {
            print(`Property ${prop} doesn't exist`);
        }
    },
    set: (target, prop, value) => {
        if (typeof value === 'object' && !Array.isArray(value)) {
            target[prop] = value;
            print(`Property ${prop} set to`, value);
        } else {
            console.error(`Invalid value type for ${prop}`);
        }
    }
};

// Main execution
(async () => {
    const urls = ['https: 
    try {
        const data = await fetchMultipleData(urls);
        const proxiedData = new Proxy(data, resultHandler);
        print(proxiedData[0]);  
        proxiedData[1] = { data: 'Updated Data' };  
        print(proxiedData[1]);
    } catch (error) {
        console.error('Error:', error.message);
    }
})();
