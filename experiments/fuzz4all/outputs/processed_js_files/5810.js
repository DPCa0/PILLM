 

 
async function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === 'https://api.example.com/data') {
                resolve({ id: 1, name: 'Advanced JS Features' });
            } else {
                reject(new Error('Invalid URL'));
            }
        }, 1000);
    });
}

 
const dataHandler = {
    get(target, prop) {
        print(`Accessing property: ${prop}`);
        return Reflect.get(target, prop);
    },
    set(target, prop, value) {
        print(`Setting property: ${prop} to ${value}`);
        return Reflect.set(target, prop, value);
    }
};

 
(async function() {
    try {
        const dataUrl = 'https://api.example.com/data';
        const fetchedData = await fetchData(dataUrl);
        
        const dataProxy = new Proxy(fetchedData, dataHandler);
        
        print(dataProxy.name);  
        dataProxy.name = 'Updated JS Features';  
        print(dataProxy.name);  
    } catch (error) {
        console.error(error);
    }
})();
