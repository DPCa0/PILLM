 
const crypto = require('crypto');

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
         
        setTimeout(() => {
            if (url) {
                resolve(`Data from ${url}`);
            } else {
                reject(new Error('URL is required'));
            }
        }, 1000);
    });
}

 
async function fetchMultipleData(urls) {
    try {
        const promises = urls.map(url => fetchData(url));
        const data = await Promise.all(promises);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
const handler = {
    get: function(target, property) {
        return property in target ? target[property] : `Property "${property}" does not exist`;
    }
};

const targetObject = { existingProp: 'I exist' };
const proxyObject = new Proxy(targetObject, handler);

 
const secretKey = crypto.randomBytes(16).toString('hex');

 
(async () => {
    print('Random Secret Key:', secretKey);

    const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
    const data = await fetchMultipleData(urls);
    print('Fetched Data:', data);

    print('Accessing proxy object properties:');
    print('existingProp:', proxyObject.existingProp);
    print('nonExistingProp:', proxyObject.nonExistingProp);
})();
