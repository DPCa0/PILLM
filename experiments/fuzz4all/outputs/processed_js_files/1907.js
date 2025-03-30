 

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function* fetchData() {
    let count = 1;
    while (count <= 3) {
        await delay(1000);  
        yield `Data chunk ${count++}`;
    }
}

 
const logHandler = {
    get(target, property) {
        print(`Getting property "${property}"`);
        return target[property];
    },
    set(target, property, value) {
        print(`Setting property "${property}" to "${value}"`);
        target[property] = value;
        return true;
    }
};

const dataStore = new Proxy({}, logHandler);

 
(async () => {
    const generator = fetchData();
    for await (const data of generator) {
        print(data);
        dataStore[`chunk${data.split(' ')[2]}`] = data;  
    }
    print('All data fetched:', dataStore);
})();
