 

 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: 'Secret Data', id: 1 });
        }, 1000);
    });
}

 
const privateData = Symbol('privateData');

 
const handler = {
    get(target, property) {
        if (property === 'getPrivateData') {
            return async () => {
                const data = await fetchData();
                target[privateData] = data;
                return target[privateData];
            };
        }
        return Reflect.get(target, property);
    },
    set(target, property, value) {
        if (property === 'id') {
            print('Attempted to set ID:', value);
            return false;  
        }
        return Reflect.set(target, property, value);
    },
};

 
const obj = {
    name: 'Advanced Object',
    id: 42,
};

const proxiedObj = new Proxy(obj, handler);

 
(async () => {
    print(`Object Name: ${proxiedObj.name}`);

     
    proxiedObj.id = 99;

     
    const privateInfo = await proxiedObj.getPrivateData();
    print('Fetched Private Info:', privateInfo);

     
    print(`Object ID: ${proxiedObj.id}`);
})();
