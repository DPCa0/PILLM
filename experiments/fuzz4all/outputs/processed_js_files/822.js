 

 
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ data: 'some data', timestamp: Date.now() });
        }, 1000);
    });
}

 
const dataHandler = {
    get(target, prop) {
        print(`Property '${prop}' has been accessed`);
        return target[prop];
    },
    set(target, prop, value) {
        print(`Property '${prop}' has been set to '${value}'`);
        target[prop] = value;
        return true;
    }
};

 
async function processData() {
    try {
        print('Fetching data...');
        const result = await fetchData();
        
         
        const proxyData = new Proxy(result, dataHandler);
        
         
        print('Data:', proxyData.data);
        print('Timestamp:', proxyData.timestamp);
        
        proxyData.data = 'updated data';
        print('Updated Data:', proxyData.data);
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
processData();
