 
 

 
const uniqueId = Symbol('id');

 
const targetObject = {
    [uniqueId]: 1,
    name: 'AdvancedJS'
};
const handler = {
    get: (obj, prop) => {
        print(`Accessing property '${prop}'`);
        return prop in obj ? obj[prop] : 'Not found';
    },
    set: (obj, prop, value) => {
        print(`Setting property '${prop}' to '${value}'`);
        obj[prop] = value;
        return true;
    }
};
const proxyObject = new Proxy(targetObject, handler);

 
const fetchData = async (url) => {
    try {
        print('Fetching data...');
        const response = await new Promise((resolve, reject) => {
            setTimeout(() => resolve(`Data from ${url}`), 1000);
        });
        print('Data fetched:', response);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

 
const map = new Map();
map.set('key1', 'value1').set('key2', 'value2');

const set = new Set(['value1', 'value2', 'value1']);  

 
(async () => {
    proxyObject.name = 'ComplexJS';  
    print(proxyObject.name);  
    print(proxyObject.nonExistentProperty);  
    
    await fetchData('https://example.com/api');  
    
    print('Map:', Array.from(map.entries()));  
    print('Set:', Array.from(set.values()));  
})();
