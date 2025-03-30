 

 
async function fetchData() {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    await delay(1000);
    return { data: 'Hello, world!', timestamp: new Date().toISOString() };
}

 
const handler = {
    get: (target, prop) => {
        print(`Property '${prop}' was accessed.`);
        return target[prop];
    }
};

 
(async () => {
    try {
        const rawData = await fetchData();
        
         
        const dataStore = new Map();
        dataStore.set('key1', rawData);
        
         
        const dataWithProxy = new Proxy(dataStore.get('key1'), handler);
        
         
        const clonedData = { ...dataWithProxy, extraInfo: 'This is additional information.' };
        
        print(clonedData.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
