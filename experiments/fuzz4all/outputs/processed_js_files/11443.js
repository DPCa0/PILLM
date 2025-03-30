 

 
function fetchDataSimulator(url) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`Data from ${url}`);
        }, Math.random() * 2000);
    });
}

 
function* dataFetcher() {
    yield fetchDataSimulator('https://api.example.com/data1');
    yield fetchDataSimulator('https://api.example.com/data2');
    yield fetchDataSimulator('https://api.example.com/data3');
}

 
const handler = {
    get(target, prop, receiver) {
        print(`GET ${prop}`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
        print(`SET ${prop} = ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

 
const dataStore = new Proxy({}, handler);

 
async function processData() {
    const generator = dataFetcher();
    for (let promise of generator) {
        const data = await promise;
        dataStore[`data${Object.keys(dataStore).length + 1}`] = data;
    }
    print('All data processed:', dataStore);
}

 
processData();
