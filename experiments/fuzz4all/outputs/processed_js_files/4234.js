 

 
const fetchData = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ data: 'Hello, advanced JavaScript!' }), Math.random() * 2000);
    });
};

 
async function getData() {
    print('Fetching data...');
    const response = await fetchData();
    print('Data received:', response.data);
}

 
const handler = {
    get: (target, property) => {
        print(`Getting property '${property}'`);
        return Reflect.get(target, property);
    },
    set: (target, property, value) => {
        print(`Setting property '${property}' to '${value}'`);
        return Reflect.set(target, property, value);
    }
};

 
const targetObject = { message: 'Initial Message' };
const proxyObject = new Proxy(targetObject, handler);

 
function manipulateObject(obj) {
    print(obj.message);
    obj.message = 'Updated via Proxy';
    print(obj.message);
}

 
getData().then(() => {
     
    manipulateObject(proxyObject);
});
