 

 
function* fetchData() {
    const dataChunks = [
        { id: 1, value: 'Chunk 1' },
        { id: 2, value: 'Chunk 2' },
        { id: 3, value: 'Chunk 3' }
    ];
    for (const chunk of dataChunks) {
        yield new Promise(resolve => setTimeout(() => resolve(chunk), 1000));
    }
}

 
async function processChunks(generator) {
    for (const promise of generator) {
        const chunk = await promise;
        print('Processing:', chunk);
    }
}

 
const handler = {
    get(target, prop, receiver) {
        print(`Accessing property: ${prop}`);
        return Reflect.get(...arguments);
    }
};

const proxyObject = new Proxy({ a: 1, b: 2, c: 3 }, handler);

 
(async () => {
    print('Starting data processing...');
    await processChunks(fetchData());

    print('Accessing properties through proxy:');
    print(proxyObject.a);
    print(proxyObject.b);
    print(proxyObject.c);
})();
