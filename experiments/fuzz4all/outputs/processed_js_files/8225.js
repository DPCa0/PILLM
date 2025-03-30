 

 
const fetchData = async (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id, name: `Item ${id}`, value: Math.floor(Math.random() * 100) });
        }, 1000);
    });
};

 
const createLoggingProxy = (data) => {
    return new Proxy(data, {
        get: (target, property) => {
            print(`Accessing property '${property}'`);
            return Reflect.get(target, property);
        }
    });
};

 
(async () => {
    const ids = [1, 2, 3, 4, 5];
    const fetchPromises = ids.map(id => fetchData(id));
    const items = await Promise.all(fetchPromises);

     
    const proxiedItems = items.map(item => createLoggingProxy(item));

     
    const totalValue = proxiedItems
        .filter(item => item.value > 50)
        .map(item => {
            item.value += 10;  
            return item;
        })
        .reduce((acc, item) => acc + item.value, 0);

    print('Total value of filtered and mapped items:', totalValue);
})();
