 

 
function mockAPICall(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.2 ? resolve(`Data received: ${data}`) : reject('Error: Failed to fetch data');
        }, 1000);
    });
}

 
async function fetchData(data) {
    try {
        const result = await mockAPICall(data);
        print(result);
    } catch (error) {
        console.error(error);
    }
}

 
const targetObject = { secret: 'hidden value', visible: 'I am here' };
const handler = {
    get: (obj, prop) => {
        print(`Accessed property: ${prop}`);
        return prop in obj ? obj[prop] : `Property ${prop} does not exist`;
    }
};

const proxiedObject = new Proxy(targetObject, handler);

 
fetchData('Sample API Data');
print(proxiedObject.secret);
print(proxiedObject.visible);
print(proxiedObject.nonexistent);
