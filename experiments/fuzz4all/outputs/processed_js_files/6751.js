 

 
const fetchData = async () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ data: "Fetched Data" }), 1000);
    });
};

 
const target = {
    message: "Initial Message"
};

 
const handler = {
    get: async (obj, prop) => {
        if (prop === 'data') {
            const data = await fetchData();
            return Reflect.get(data, 'data');  
        }
        return Reflect.get(obj, prop);
    }
};

 
const proxy = new Proxy(target, handler);

(async () => {
    print(await proxy.data);  
    print(proxy.message);  
})();
