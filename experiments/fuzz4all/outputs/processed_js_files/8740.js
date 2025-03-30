 

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url) {
                resolve(`Data from ${url}`);
            } else {
                reject('Invalid URL');
            }
        }, 1000);
    });
}

 
async function getData(url) {
    try {
        const data = await fetchData(url);
        print('Data Retrieved:', data);
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

 
const handler = {
    get: function(target, prop) {
        print(`Getting the property "${prop}"`);
        return prop in target ? target[prop] : 'Property not found';
    },
    set: function(target, prop, value) {
        print(`Setting property "${prop}" to "${value}"`);
        target[prop] = value;
        return true;
    }
};

const targetObject = { foo: 'bar' };
const proxyObject = new Proxy(targetObject, handler);

 
const dataMap = new Map();
proxyObject.data = 'Some Initial Data';

 
(async function complexInteraction() {
    proxyObject.newProp = 'New Property Value';
    print('NewProp:', proxyObject.newProp);
    print('NonExistentProp:', proxyObject.nonExistentProp);

    const retrievedData = await getData('https://example.com/api/data');
    if (retrievedData) {
        dataMap.set('apiData', retrievedData);
    }

    print('Stored Data in Map:', dataMap.get('apiData'));
})();
