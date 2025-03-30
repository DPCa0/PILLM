 
(async function() {
     
    const fetchData = () => new Promise(resolve => setTimeout(() => resolve(['apple', 'banana', 'cherry']), 1000));

    try {
         
        const data = await fetchData();

         
        const [first, ...rest] = data;
        print(`First fruit: ${first}`);
        print(`Other fruits: ${rest.join(', ')}`);

         
        const handler = {
            get(target, prop) {
                if (prop === 'fruits') {
                    return target[prop].map(fruit => fruit.toUpperCase());
                }
                return target[prop];
            }
        };
        
        const fruitBasket = new Proxy({ fruits: data }, handler);
        print('Fruits in basket:', fruitBasket.fruits);
        
         
        const fruitMap = new Map();
        const fruitSet = new Set(data);
        data.forEach((fruit, index) => fruitMap.set(index, fruit));
        
        print('Fruit Map:', [...fruitMap.entries()]);
        print('Fruit Set:', [...fruitSet]);

    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
