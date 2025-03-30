 

 
async function fetchData(url) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Data from ${url}`);
        }, 1000);
    });
}

 
function* dataProcessor(data) {
    for (const item of data) {
        yield item.toUpperCase();
    }
}

 
const handler = {
    get: (obj, prop) => {
        if (prop in obj) {
            return obj[prop].toUpperCase();
        }
        return `Property ${prop} does not exist`;
    }
};

 
const uniqueId = Symbol('id');

 
(async () => {
    const url = 'https://api.example.com/data';
    
     
    const data = await fetchData(url);
    print('Fetched Data:', data);

     
    const user = {
        name: 'alice',
        role: 'developer'
    };
    const proxyUser = new Proxy(user, handler);
    print('User Name:', proxyUser.name);
    print('User Role:', proxyUser.role);
    print('User Age:', proxyUser.age);

     
    user[uniqueId] = 12345;
    print('User Unique ID:', user[uniqueId]);

     
    const processedData = dataProcessor(['apple', 'banana', 'cherry']);
    for (const item of processedData) {
        print('Processed Item:', item);
    }
})();
