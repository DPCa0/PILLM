 

 
const fetchData = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve({ id: 1, name: 'Advanced JS Object' });
    }, 1000);
});

 
const getData = async () => {
    try {
        const data = await fetchData();
        print('Data fetched:', data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

 
const handler = {
    get(target, prop, receiver) {
        print(`Property '${prop}' accessed`);
        return Reflect.get(...arguments);
    },
    set(target, prop, value) {
        print(`Setting value '${value}' to property '${prop}'`);
        return Reflect.set(...arguments);
    }
};

 
(async () => {
    const data = await getData();
    
     
    const proxiedData = new Proxy(data, handler);

     
    print(proxiedData.name);  
    proxiedData.name = 'Updated JS Object';  
    print(proxiedData.name);
})();
