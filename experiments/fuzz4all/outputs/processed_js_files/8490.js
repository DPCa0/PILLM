 

 
const fetchData = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ name: 'Alice', age: 25, location: 'Wonderland' });
        }, 1000);
    });
};

 
function* charGenerator(str) {
    for (let char of str) {
        yield char;
    }
}

 
const handler = {
    get(target, prop, receiver) {
        if (prop in target) {
            return Reflect.get(target, prop, receiver);
        } else {
            return 'Property not found';
        }
    }
};

 
const complexWorkflow = async () => {
    print('Fetching data...');

     
    const user = await fetchData();
    print('Data received:', user);

     
    const userProxy = new Proxy(user, handler);
    print('User Name:', userProxy.name);
    print('Unknown Property:', userProxy.unknownProp);

     
    const uniqueKey = Symbol('id');
    user[uniqueKey] = 12345;
    print('Unique ID:', user[uniqueKey]);

     
    const { name, ...details } = user;
    print('Destructured:', { name, details });

     
    print('Iterating over name characters:');
    const nameIterator = charGenerator(name);
    for (let char of nameIterator) {
        print(char);
    }
};

complexWorkflow().catch(console.error);
