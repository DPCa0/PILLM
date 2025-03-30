 

 
const fetchData = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ name: "Alice", age: 30, role: "Developer" });
        }, 1000);
    });
};

 
const handler = {
    get: (target, property) => {
        print(`Getting property ${property}`);
        return Reflect.get(target, property);
    },
    set: (target, property, value) => {
        print(`Setting property ${property} to ${value}`);
        return Reflect.set(target, property, value);
    },
    deleteProperty: (target, property) => {
        print(`Deleting property ${property}`);
        return Reflect.deleteProperty(target, property);
    }
};

 
(async () => {
    try {
         
        const data = await fetchData();

         
        const proxyData = new Proxy(data, handler);

         
        print(proxyData.name);  
        proxyData.age = 31;  
        delete proxyData.role;  

         
        print("Final data state:", proxyData);
    } catch (error) {
        console.error("An error occurred:", error);
    }
})();
