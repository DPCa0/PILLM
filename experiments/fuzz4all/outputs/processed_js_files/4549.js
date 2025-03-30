 

 
const fetchData = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ name: "John Doe", age: 30, city: "New York" });
        }, 1000);
    });
};

 
const loggerProxyHandler = {
    get(target, property) {
        print(`GET property '${property}'`);
        return target[property];
    },
    set(target, property, value) {
        print(`SET property '${property}' to '${value}'`);
        target[property] = value;
        return true;
    }
};

 
const processData = async () => {
    try {
        const data = await fetchData();
        const proxiedData = new Proxy(data, loggerProxyHandler);

        print('Initial Data:', proxiedData);

         
        print('Name:', proxiedData.name);
        print('Age:', proxiedData.age);

         
        proxiedData.age = 31;
        print('Updated Age:', proxiedData.age);

    } catch (error) {
        console.error('Error processing data:', error);
    }
};

 
processData();
