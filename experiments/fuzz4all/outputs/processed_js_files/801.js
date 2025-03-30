 

 
const handler = {
    get(target, property) {
        if (property in target) {
            print(`Getting value of ${property}: ${target[property]}`);
            return target[property];
        } else {
            throw new ReferenceError(`Property ${property} does not exist`);
        }
    },
    set(target, property, value) {
        if (typeof value === 'number') {
            print(`Setting value of ${property} to ${value}`);
            target[property] = value;
            return true;
        } else {
            throw new TypeError(`The value of ${property} must be a number`);
        }
    }
};

 
const data = { count: 0 };
const proxyData = new Proxy(data, handler);

 
const fetchData = async (url) => {
    print(`Fetching data from ${url}`);
    return new Promise((resolve) => {
        setTimeout(() => resolve({ data: { message: "Hello, Proxy!" } }), 1000);
    });
};

 
const uniqueKey = Symbol("unique");

 
(async () => {
    try {
        proxyData.count = 1;  
        print(proxyData.count);  
        
        const apiResponse = await fetchData("https://api.example.com/data");
        print(apiResponse.data.message);

        proxyData[uniqueKey] = 42;  
        print(`Unique Key Value: ${proxyData[uniqueKey]}`);  
        
    } catch (error) {
        console.error(error.message);
    }
})();
