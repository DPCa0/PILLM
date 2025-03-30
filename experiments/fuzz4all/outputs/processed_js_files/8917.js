 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(['apple', 'banana', 'cherry']);
        }, 1000);
    });
}

 
const handler = {
    get: function(target, property) {
        if (property === 'fruits') {
            return [...target].sort();
        }
        return Reflect.get(...arguments);
    }
};

 
(async () => {
     
    const data = await fetchData();
    
     
    const proxyArray = new Proxy(data, handler);
    
     
    function* fruitIterator(arr) {
        for (const item of arr) {
            yield item.toUpperCase();
        }
    }
    
     
    const [fruit1, fruit2, fruit3] = proxyArray.fruits;
    
     
    print({fruit1, fruit2, fruit3});
    
     
    const uniqueFruits = new Set(proxyArray.fruits);
    const fruitMap = new Map([...uniqueFruits].map(fruit => [fruit, fruit.length]));
    
     
    for (const [fruit, length] of fruitMap) {
        print(`Fruit: ${fruit}, Length: ${length}`);
    }
    
     
    for (const fruit of fruitIterator(proxyArray.fruits)) {
        print(`Iterated Fruit: ${fruit}`);
    }
})();
