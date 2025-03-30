 
const fetchData = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['apple', 'banana', 'grape', 'orange', 'mango']);
        }, 1000);
    });
};

 
(async () => {
    try {
        const [firstFruit, ...otherFruits] = await fetchData();
        print(`First fruit: ${firstFruit}`);
        
         
        const fruitHandler = {
            get: (target, prop) => {
                print(`Accessing fruit at index ${prop}`);
                return target[prop];
            }
        };
        
        const proxiedFruits = new Proxy(otherFruits, fruitHandler);
        
         
        const fruitMap = new Map();
        proxiedFruits.forEach((fruit, index) => fruitMap.set(index, fruit));
        
        print('Other fruits:');
        for (const [index, fruit] of fruitMap) {
            print(`Index ${index}: ${fruit}`);
        }
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
