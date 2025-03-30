 

 
const fetchData = async (url) => {
     
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { data: `Data from ${url}` };
};

 
function* infiniteNumbers() {
    let n = 0;
    while (true) {
        yield n++;
    }
}

 
const handler = {
    get: function(target, prop) {
        print(`Getting property ${prop}`);
        return target[prop];
    },
    set: function(target, prop, value) {
        print(`Setting property ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

 
const reactiveObject = new Proxy({ count: 0 }, handler);

 
const main = async () => {
    print('Starting data fetch...');
    
    const dataPromise = fetchData('https://api.example.com/data');
    
     
    const numGen = infiniteNumbers();
    print(`First number: ${numGen.next().value}`);
    
     
    reactiveObject.count = 1;
    print(`Count: ${reactiveObject.count}`);

     
    const result = await dataPromise;
    print(result.data);
};

main();
