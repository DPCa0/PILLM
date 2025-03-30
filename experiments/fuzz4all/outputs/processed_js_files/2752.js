 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
    print('Fetching data...');
    await delay(2000);  
    print('Data fetched.');
    return { id: 1, name: 'Item 1' };
}

 
function* dataGenerator() {
    yield fetchData();
    yield fetchData();
    yield fetchData();
}

 
const handler = {
    get: (target, prop) => {
        print(`Accessing property: ${prop}`);
        return target[prop];
    }
};

 
const dataMap = new Map();
dataMap.set('item1', { id: 1, name: 'First item' });
dataMap.set('item2', { id: 2, name: 'Second item' });

 
const proxiedMap = new Proxy(dataMap, handler);

 
async function runGenerator() {
    const gen = dataGenerator();
    for (const promise of gen) {
        const data = await promise;
        print('Fetched Data:', data);
    }
}

 
(async () => {
     
    print(proxiedMap.get('item1'));
    print(proxiedMap.get('item2'));

     
    await runGenerator();
})();
