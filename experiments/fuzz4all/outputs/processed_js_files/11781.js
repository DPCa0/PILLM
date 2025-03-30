 

 
function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(['apple', 'banana', 'apple', 'orange', 'banana', 'pear']);
        }, 1000);
    });
}

 
async function processData() {
    try {
         
        const data = await fetchData();
        
         
        const uniqueFruits = [...new Set(data)];

         
        const fruitCountMap = new Map();
        data.forEach(fruit => {
            fruitCountMap.set(fruit, (fruitCountMap.get(fruit) || 0) + 1);
        });

         
        const handler = {
            get: (target, property) => {
                print(`Accessed fruit: ${property}`);
                return target[property];
            }
        };

        const fruitProxy = new Proxy(fruitCountMap, handler);

         
        print('Unique Fruits:', uniqueFruits);
        print('Fruit Counts:', Array.from(fruitProxy.entries()));

    } catch (error) {
        console.error('Error processing data:', error);
    }
}

 
processData();
