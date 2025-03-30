 
const fetchData = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(['apple', 'banana', 'cherry']);
        }, 1000);
    });
};

 
const logAccessHandler = {
    get: (target, property) => {
        print(`Accessing property: ${property}`);
        return target[property];
    }
};

 
class FruitProcessor {
    static *process(fruits) {
        for (const fruit of fruits) {
            yield `Processed ${fruit}`;
        }
    }
}

 
(async () => {
     
    const fruits = await Promise.all([fetchData(), fetchData()]);
    
     
    const uniqueFruits = [...new Set(fruits.flat())];

     
    const proxiedFruits = new Proxy(uniqueFruits, logAccessHandler);

     
    const processor = proxiedFruits?.[0] ?? 'No fruits to process';
    
     
    const processedFruits = [...FruitProcessor.process(proxiedFruits)];

     
    print(`First fruit: ${processor}`);
    print(`Processed fruits: ${processedFruits.join(', ')}`);
})();
