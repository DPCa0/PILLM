 

 
const fetchData = () => new Promise((resolve) => {
    setTimeout(() => resolve({ status: 200, data: { name: 'Alice', age: 30 } }), 1000);
});

 
const loggingProxy = (target) => new Proxy(target, {
    get: (obj, prop) => {
        print(`Getting property: ${prop}`);
        return obj[prop];
    },
    set: (obj, prop, value) => {
        print(`Setting property: ${prop} to ${value}`);
        obj[prop] = value;
        return true;
    }
});

(async () => {
    try {
         
        const response = await fetchData();
        const { status, data: { name, ...rest } } = response;

        print(`Status: ${status}`);
        print(`Name: ${name}`);
        print(`Rest of the data:`, rest);

         
        const proxyData = loggingProxy(rest);
        
         
        proxyData.age = 31;
        print(`Updated Age: ${proxyData.age}`);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
