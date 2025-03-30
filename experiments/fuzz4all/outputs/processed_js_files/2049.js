 

 
const fetchData = async () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ user: 'John Doe', id: 123 }), 1000);
    });
};

 
function* dataGenerator() {
    print('Fetching data...');
    yield fetchData();
    print('Data fetched');
}

 
const handler = {
    get(target, prop, receiver) {
        print(`Accessing property "${prop}"`);
        return Reflect.get(target, prop, receiver);
    }
};

 
const run = async () => {
    const gen = dataGenerator();
    const { value } = gen.next();
    const data = await value;
    const proxyData = new Proxy(data, handler);

    print('User:', proxyData.user);
    print('ID:', proxyData.id);
};

run().catch(console.error);
