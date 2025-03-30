 

 
const fetchData = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve({ id: 1, name: 'JavaScript', features: ['async/await', 'Proxy', 'Generators'] });
    }, 1000);
});

 
function* dataProcessor() {
    print('Fetching data...');
    const data = yield fetchData();
    print('Data fetched:', data);
    return data;
}

 
async function handleGenerator(genFunc) {
    const iterator = genFunc();
    async function handle(iteratorResult) {
        if (iteratorResult.done) return iteratorResult.value;
        const value = await iteratorResult.value;
        return handle(iterator.next(value));
    }
    return handle(iterator.next());
}

 
const handler = {
    get(target, prop) {
        if (prop in target) {
            print(`Accessing property: ${prop}`);
            return target[prop];
        }
        return `Property ${prop} does not exist.`;
    },
    set(target, prop, value) {
        print(`Setting property ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

 
(async () => {
    const data = await handleGenerator(dataProcessor);
    const { id, name, features } = data;
    const proxyData = new Proxy({ id, name, features }, handler);

    print(proxyData.name);
    proxyData.language = 'ECMAScript';
    print(proxyData.language);
    print(proxyData.unknownProperty);  
})();
