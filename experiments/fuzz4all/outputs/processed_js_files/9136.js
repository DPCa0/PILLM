 

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === 'https://api.example.com/data') {
                resolve({ id: 1, value: 'Hello, World!' });
            } else {
                reject('Invalid URL');
            }
        }, 1000);
    });
}

 
const handler = {
    get(target, prop) {
        if (prop in target) {
            print(`Getting property: ${prop}`);
            return Reflect.get(target, prop);
        } else {
            console.warn(`Property ${prop} doesn't exist. Returning default value.`);
            return 'Default Value';
        }
    },
    set(target, prop, value) {
        print(`Setting property: ${prop} to ${value}`);
        return Reflect.set(target, prop, value);
    }
};

// Async function to fetch and display data
async function displayData() {
    try {
        const data = await fetchData('https: 
        const proxyData = new Proxy(data, handler);
        
         
        print(proxyData.id);  
        print(proxyData.value);  
        print(proxyData.nonExistentProperty);  

         
        proxyData.value = 'Hello, Proxy!';
        print(proxyData.value);  

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
displayData();
