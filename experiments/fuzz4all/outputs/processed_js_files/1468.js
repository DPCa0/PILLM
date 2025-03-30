 
async function complexProcess() {
     
    const fetchData = () => new Promise((resolve) =>
        setTimeout(() => resolve(['apple', 'orange', 'banana']), 1000)
    );

     
    const data = await fetchData();
    
     
    const [firstFruit, ...otherFruits] = data;
    
     
    const fruitMap = new Map();
    fruitMap.set('firstFruit', firstFruit);
    fruitMap.set('otherFruits', otherFruits);
    
     
    const fruitList = Array.from(fruitMap.entries()).map(([key, value]) => ({ [key]: value }));
    
     
    print(`Processed Fruits: ${JSON.stringify(fruitList, null, 2)}`);

     
    const fruitProxy = new Proxy(fruitMap, {
        get(target, prop) {
            print(`Accessed property: ${prop}`);
            return target[prop];
        }
    });

     
    print(`First fruit: ${fruitProxy.get('firstFruit')}`);
}

complexProcess();
