 

 
const fetchData = () => new Promise((resolve) => {
    setTimeout(() => resolve({ data: 'Important Data', meta: { timestamp: Date.now() } }), 1000);
});

 
const handler = {
    get: (target, prop, receiver) => {
        if (prop in target) {
            print(`Accessing property: ${prop}`);
            return Reflect.get(target, prop, receiver);
        } else {
            console.warn(`Property ${prop} does not exist.`);
            return undefined;
        }
    },
    set: (target, prop, value) => {
        print(`Setting property: ${prop} to ${value}`);
        return Reflect.set(target, prop, value);
    }
};

 
(async () => {
    try {
        print('Fetching data...');
        const result = await fetchData();
        
        const proxyData = new Proxy(result, handler);
        
         
        print(proxyData.data);   
        print(proxyData.nonExistentProp);   
        
         
        proxyData.newProp = 'New Value';

    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
