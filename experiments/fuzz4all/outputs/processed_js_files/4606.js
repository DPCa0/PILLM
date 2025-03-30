 

const fetchData = async (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { name: 'John', age: 30, location: { city: 'New York', country: 'USA' } };
            url ? resolve(data) : reject('URL is required');
        }, 1000);
    });
};

const handler = {
    get: (target, prop) => {
        return prop in target ? target[prop] : 'Property does not exist';
    }
};

(async () => {
    try {
        const data = await fetchData('https://api.example.com/user');
        const proxyData = new Proxy(data, handler);
        
        const { name, age, location: { city } } = proxyData;
        
        print(`Name: ${name}, Age: ${age}, City: ${city}`);
        
         
        print(proxyData.nonExistingProperty);
    } catch (error) {
        console.error('Error:', error);
    }
})();
