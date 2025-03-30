 
async function fetchData() {
     
    return new Promise(resolve => setTimeout(() => {
        resolve(['apple', 'banana', 'cherry']);
    }, 1000));
}

 
(async () => {
    try {
         
        let fruitSet = new Set(await fetchData());

         
        let fruitMap = new Map([...fruitSet].map((fruit, index) => [index, fruit.toUpperCase()]));

         
        let handler = {
            get: (obj, prop) => {
                if (prop in obj) {
                    print(`Accessed property "${prop}" with value: ${obj[prop]}`);
                    return obj[prop];
                }
                return `Property "${prop}" not found.`;
            },
            set: (obj, prop, value) => {
                print(`Set property "${prop}" to value: ${value}`);
                obj[prop] = value;
                return true;
            }
        };

        let proxyMap = new Proxy(fruitMap, handler);

         
        print(proxyMap.get(0));
        proxyMap.set(3, 'DURIAN');
        print(proxyMap.get(3));

         
        let [first, ...rest] = fruitSet;
        print(`First fruit: ${first}, Rest: ${rest.join(', ')}`);

         
        let fruitObj = { ...Object.fromEntries(fruitMap.entries()) };
        let { 0: firstFruit, ...otherFruits } = fruitObj;
        print(`First fruit via object: ${firstFruit}, Other fruits:`, otherFruits);
    } catch (error) {
        console.error('Error encountered:', error);
    }
})();
