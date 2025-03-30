 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const fetchData = async () => {
    await delay(1000);
    return { id: 1, value: Math.random() * 100 };
};

 
const mapHandler = {
    get: (target, prop) => {
        print(`Getting property '${prop}'`);
        return target[prop];
    },
    set: (target, prop, value) => {
        print(`Setting property '${prop}' to '${value}'`);
        target[prop] = value;
        return true;
    }
};

 
const dataMap = new Proxy(new Map(), mapHandler);

(async () => {
    try {
        const data = await fetchData();
        dataMap.set(data.id, data.value);
        print(`Data stored: ${data.id} -> ${dataMap.get(data.id)}`);
        
         
        const results = await Promise.all([fetchData(), fetchData()]);
        results.forEach(({id, value}) => dataMap.set(id, value));
        
        print('Final data in map:');
        for (let [key, value] of dataMap) {
            print(`${key} -> ${value}`);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
