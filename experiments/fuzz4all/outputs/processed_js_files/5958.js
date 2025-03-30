 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ data: [1, 2, 3, 4, 5] }), 1000);
    });
}

 
const handler = {
    get: function(target, prop) {
        print(`Getting property ${prop}`);
        return prop in target ? target[prop] : 42;
    },
    set: function(target, prop, value) {
        print(`Setting property ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

const dataProxy = new Proxy({}, handler);

 
(async function() {
     
    const response = await fetchData();
    
     
    const { data } = response;
    
     
    dataProxy.values = data;
    
     
    const extendedData = [...data, 6, 7, 8];

     
    const filteredData = extendedData.map(x => x * 2).filter(x => x > 5);

     
    print(`Original data: ${data}`);
    print(`Extended data: ${extendedData}`);
    print(`Filtered data: ${filteredData}`);

     
    print(`Accessing non-existent property: ${dataProxy.nonExistent?.prop ?? 'default value'}`);
})();
