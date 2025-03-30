 

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
function* fetchData() {
    yield delay(1000).then(() => 'Data part 1 loaded.');
    yield delay(1000).then(() => 'Data part 2 loaded.');
    yield delay(1000).then(() => 'Data part 3 loaded.');
}

 
async function handleData() {
    const dataGen = fetchData();
    for (let data of dataGen) {
        print(await data);
    }
    print('All data fetched.');
}

 
const logHandler = {
    get(target, prop) {
        print(`Property ${prop} accessed`);
        return target[prop];
    },
    set(target, prop, value) {
        print(`Setting property ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

 
const dataStore = new Proxy({ info: 'Initial Data' }, logHandler);

 
print(dataStore.info);
dataStore.info = 'Updated Data';
print(dataStore.info);

 
handleData();
