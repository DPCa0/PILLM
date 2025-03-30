 

 
const fetchData = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: 'Hello, world!' });
        }, 1000);
    });
};

 
const handler = {
    get: (target, prop, receiver) => {
        print(`Property '${prop}' accessed`);
        return Reflect.get(target, prop, receiver);
    },
    set: (target, prop, value, receiver) => {
        print(`Setting property '${prop}' to '${value}'`);
        return Reflect.set(target, prop, value, receiver);
    }
};

 
const main = async () => {
    const fetchedData = await fetchData();
    
     
    const proxyData = new Proxy(fetchedData, handler);

    print(proxyData.data);  
    proxyData.data = 'Hello, Proxy!';  

    print(proxyData.data);
};

main();
