 
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        
         
        const mappedData = data.map(({ id, name, age }) => ({
            userId: id,
            userName: name.toUpperCase(),
            userAge: age + 5
        }));
        
        return mappedData;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
};

 
const performOperations = async () => {
    const urls = [
        'https://api.example.com/data1',
        'https://api.example.com/data2'
    ];
    
     
    const results = await Promise.all(urls.map(fetchData));
    
     
    const allResults = results.flat();
    print(allResults);
};

 
const createLoggingProxy = (obj) => new Proxy(obj, {
    get(target, prop) {
        print(`Accessing property: ${prop}`);
        return Reflect.get(target, prop);
    },
    set(target, prop, value) {
        print(`Setting property: ${prop} to ${value}`);
        return Reflect.set(target, prop, value);
    }
});

 
(async () => {
    const data = { name: 'John Doe', age: 30 };
    const proxyData = createLoggingProxy(data);
    
    print(proxyData.name);  
    proxyData.age = 35;  
    
    await performOperations();
})();
