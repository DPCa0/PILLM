 

 
function* fetchDataSequence() {
    yield new Promise(resolve => setTimeout(() => resolve('Data from API 1'), 1000));
    yield new Promise(resolve => setTimeout(() => resolve('Data from API 2'), 2000));
    yield new Promise(resolve => setTimeout(() => resolve('Data from API 3'), 1500));
}

 
async function processData() {
    const generator = fetchDataSequence();
    for (let promise of generator) {
        try {
            const data = await promise;
            print(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}

 
const dataHandler = {
    get(target, property) {
        print(`Accessing property ${property}`);
        return target[property];
    },
};

const data = { api1: 'Data1', api2: 'Data2', api3: 'Data3' };
const proxyData = new Proxy(data, dataHandler);

 
(async () => {
    print('Starting data processing...');
    await processData();
    print('Accessing data properties via Proxy...');
    print(proxyData.api1);
    print(proxyData.api2);
    print(proxyData.api3);
})();
