 
async function fetchData(endpoint) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.2) {
                resolve(`Data from ${endpoint}`);
            } else {
                reject('Failed to fetch data');
            }
        }, 1000);
    });
}

 
const handler = {
    get: (target, property) => {
        print(`Getting ${property}`);
        return target[property];
    },
    set: (target, property, value) => {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

const dataStore = new Proxy({ info: null }, handler);

 
(async () => {
    try {
        print('Fetching data...');
        const data = await fetchData('https://api.example.com/data');
        dataStore.info = data;  
        print(dataStore.info);  
    } catch (error) {
        console.error(error);
    } finally {
        print('Operation completed.');
    }
})();
