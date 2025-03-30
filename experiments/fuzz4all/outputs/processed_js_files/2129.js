 
const fetchData = async ({ url, method = 'GET' }) => {
    const response = await fetch(url, { method });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
};

 
const targetObject = { name: 'Alice', age: 30 };
const handler = {
    get: (obj, prop) => {
        print(`Getting property '${prop}'`);
        return prop in obj ? obj[prop] : 'Property does not exist';
    },
    set: (obj, prop, value) => {
        print(`Setting property '${prop}' to '${value}'`);
        obj[prop] = value;
        return true;
    }
};

const proxyObject = new Proxy(targetObject, handler);

 
print(proxyObject.name);  
proxyObject.age = 31;
print(proxyObject.age);  

 
const loadData = async () => {
    try {
        const data = await fetchData({ url: 'https://jsonplaceholder.typicode.com/users/1' });
        print('User Data:', data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

 
(async () => {
    print('Program start');

     
    await loadData();

    print('Program end');
})();
