 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        
         
        const dataMap = new Map(data.map(item => [item.id, item]));
        
         
        const handler = {
            get: function(target, property) {
                if (property in target) {
                    return target[property];
                }
                throw new ReferenceError(`Property "${property}" does not exist.`);
            }
        };
        
         
        const proxyData = new Proxy(dataMap, handler);
        
         
        print(proxyData.get(1));  
        print(proxyData.get(9999));  
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
}

 
const result = {
    user: {
        name: 'John Doe',
        address: null
    }
};

print(result.user?.address?.city ?? 'City not available');

 
(async () => {
    await fetchData('https://jsonplaceholder.typicode.com/posts');
})();
