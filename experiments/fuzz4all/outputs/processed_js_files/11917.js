 

 
async function fetchData(id) {
    return new Promise(resolve => setTimeout(() => resolve({ id, value: Math.random() * 100 }), 1000));
}

 
(async function processSequentially() {
    const ids = [1, 2, 3];
    const results = [];

    for (const id of ids) {
         
        const { value } = await fetchData(id);
        results.push({ id, value });
    }

     
    const dataMap = new Map(results.map(({ id, value }) => [id, value]));

     
    const handler = {
        get(target, prop) {
            return target.get(parseInt(prop)) || 'Not found';
        }
    };
    const proxiedData = new Proxy(dataMap, handler);

    print('Results:', results);
    print('Access id 2:', proxiedData[2]);  
    print('Access id 4:', proxiedData[4]);  
})();
