 

 
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.5) {
                resolve({ id: 1, data: 'Fetched Data' });
            } else {
                reject('Fetch Error: Something went wrong');
            }
        }, 1000);
    });
};

 
async function processData() {
    try {
        const data = await fetchData();
        print('Data received:', data);
    } catch (error) {
        console.error(error);
    }
}

 
const handler = {
    get(target, property, receiver) {
        print(`Getting property: ${property}`);
        return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
        print(`Setting property: ${property} to ${value}`);
        return Reflect.set(target, property, value, receiver);
    }
};

 
const targetObject = {
    name: 'JavaScript',
    version: 'ES6'
};

 
const proxyObject = new Proxy(targetObject, handler);

 
print(proxyObject.name);
proxyObject.name = 'ECMAScript';

 
processData();
