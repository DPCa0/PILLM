 

 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(['Apple', 'Banana', 'Cherry']);
        }, 1000);
    });
}

 
const loggerHandler = {
    get(target, prop) {
        if (prop in target) {
            print(`Accessing property '${prop}': ${target[prop]}`);
            return target[prop];
        } else {
            print(`Property '${prop}' does not exist.`);
            return undefined;
        }
    },
    set(target, prop, value) {
        print(`Setting property '${prop}' to ${value}`);
        target[prop] = value;
        return true;
    }
};

const fruits = new Proxy({}, loggerHandler);

 
(async () => {
    const fetchedData = await fetchData();
    const [firstFruit, ...otherFruits] = fetchedData;  

    print(`First fruit: ${firstFruit}`);
    
    const fruitsMap = new Map();
    fruitsMap.set('favorite', firstFruit);
    fruitsMap.set('others', otherFruits);

    for (const [key, value] of fruitsMap) {
        print(`${key}: ${value}`);
    }

    const fruitSet = new Set(fetchedData);
    fruitSet.add('Banana');  
    
    print('Unique fruits:', fruitSet);

    fruitsMap.forEach((value, key) => {
        fruits[key] = value;  
    });

    print('Final Fruits:', fruits);
})();
