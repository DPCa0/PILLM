 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchData() {
    await delay(1000);  
    return { id: 1, name: 'Advanced JavaScript', status: 'active' };
}

 
function* dataGenerator(dataArray) {
    for (const data of dataArray) {
        yield data;
    }
}

 
const handler = {
    get: (target, prop) => {
        print(`Getting property ${prop}`);
        return target[prop];
    },
    set: (target, prop, value) => {
        print(`Setting property ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

 
(async () => {
    print('Fetching data...');
    const fetchedData = await fetchData();
    print('Data fetched:', fetchedData);

    const proxiedData = new Proxy(fetchedData, handler);

    const dataArray = [
        proxiedData,
        { id: 2, name: 'JavaScript Proxy', status: 'inactive' }
    ];
    
    const generator = dataGenerator(dataArray);
    
    for (const data of generator) {
        print(`ID: ${data.id}, Name: ${data.name}, Status: ${data.status}`);
        if (data.id === 1) {
            data.status = 'completed';  
        }
    }
})();
