 

 
const delay = ms => new Promise(res => setTimeout(res, ms));

 
async function fetchData() {
    await delay(1000);  

    const data = { id: 1, name: 'Alice', location: { city: 'Wonderland', country: 'Dreamland' } };
    const additionalData = { occupation: 'Explorer', age: 28 };

     
    const { name, location: { city, country }, ...rest } = { ...data, ...additionalData };
    return { name, city, country, ...rest };
}

 
const createLoggingProxy = target => {
    return new Proxy(target, {
        get: (obj, prop) => {
            print(`Property '${prop}' accessed.`);
            return obj[prop];
        },
        set: (obj, prop, value) => {
            print(`Property '${prop}' set to '${value}'.`);
            obj[prop] = value;
            return true;
        }
    });
}

 
async function processData() {
    const data = await fetchData();
    const proxyData = createLoggingProxy(data);

    print(proxyData.name);  
    proxyData.age = 30;  
    print(proxyData);  
}

processData();
