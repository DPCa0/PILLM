 

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
    await delay(1000);  
    return new Set(['apple', 'banana', 'cherry']);
}

 
const handler = {
    get: function(target, prop, receiver) {
        if (prop === 'get') {
            return function(key) {
                print(`Getting value for key: ${key}`);
                return Reflect.get(target, 'get', receiver).call(target, key);
            };
        }
        return Reflect.get(target, prop, receiver);
    }
};

 
(async function() {
    try {
        print('Fetching data...');
        const data = await fetchData();
        
         
        const fruitMap = new Map([...data].map(fruit => [fruit, fruit.length]));
        print('Fruit lengths:', fruitMap);
        
         
        const proxyMap = new Proxy(fruitMap, handler);

         
        print('Length of apple:', proxyMap.get('apple'));
        print('Length of banana:', proxyMap.get('banana'));
        
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
