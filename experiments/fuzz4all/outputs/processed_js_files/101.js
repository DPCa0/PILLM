 
async function fetchData() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(['apple', 'banana', 'cherry']);
        }, 1000);
    });
}

 
const handler = {
    get: function(target, prop, receiver) {
        if (prop === 'getFruits') {
            return async function() {
                const data = await target[prop]();
                return data.filter(fruit => fruit.includes('a'));
            };
        }
        return Reflect.get(...arguments);
    }
};

const fruitStore = {
    async getFruits() {
        const data = await fetchData();
        return data;
    }
};

const proxyFruitStore = new Proxy(fruitStore, handler);

 
(async function displayFruits() {
    const fruits = await proxyFruitStore.getFruits();
    const [firstFruit, ...restFruits] = fruits;
    
    print(`First fruit: ${firstFruit}`);
    print(`Other fruits: ${restFruits.join(', ')}`);
    
     
    print(`Filtered Fruits: ${fruits.filter(fruit => fruit.length > 5).map(fruit => fruit.toUpperCase()).join(', ')}`);
    
     
    const fruitSet = new Set(fruits);
    const fruitMap = new Map([...fruitSet].map((fruit, index) => [index, fruit]));
    
    fruitMap.forEach((value, key) => {
        print(`Fruit at ${key}: ${value}`);
    });
})();
