 

 
const fetchData = () => new Promise((resolve) => {
    setTimeout(() => resolve(['apple', 'banana', 'cherry']), 1000);
});

 
async function processFruits() {
    const fruits = await fetchData();
    
    function* fruitGenerator(fruits) {
        for (let fruit of fruits) {
            yield fruit.toUpperCase();
        }
    }
    
    const iterator = fruitGenerator(fruits);
    const result = [];
    for (let fruit of iterator) {
        result.push(fruit);
    }
    return result;
}

 
const handler = {
    get(target, prop) {
        if (prop === 'length') {
            return target.length;
        }
        return Reflect.get(target, prop);
    },
    set(target, prop, value) {
        print(`Setting value at index ${prop} to ${value}`);
        return Reflect.set(target, prop, value);
    }
};

 
(async () => {
    const fruits = await processFruits();
    const proxiedFruits = new Proxy(fruits, handler);
    
    print('Fruits:', proxiedFruits);
    proxiedFruits[1] = 'BLUEBERRY';
    print('Updated Fruits:', proxiedFruits);
})();
