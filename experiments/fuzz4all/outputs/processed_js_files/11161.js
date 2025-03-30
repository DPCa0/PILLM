 

 
async function* fetchData() {
    const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
    
    for (const url of urls) {
        yield fetch(url).then(res => res.json());
    }
}

 
const handler = {
    get: (target, prop, receiver) => {
        print(`Getting property '${prop}'`);
        return Reflect.get(target, prop, receiver);
    },
    set: (target, prop, value, receiver) => {
        print(`Setting property '${prop}' to '${value}'`);
        return Reflect.set(target, prop, value, receiver);
    }
};

 
const dataObject = new Proxy({ key1: 'value1', key2: 'value2' }, handler);

 
(async () => {
    const gen = fetchData();

    for await (let data of gen) {
        print('Fetched data:', data);
         
        dataObject.key1 = data.newValue;
    }

     
    print('Final Data Object:', dataObject);
})();
