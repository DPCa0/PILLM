 
(async function() {
     
    const fetchData = () => new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.5 ? resolve(['apple', 'banana', 'cherry']) : reject('Fetch error');
        }, 1000);
    });

     
    const handler = {
        get: (target, prop) => {
            print(`Getting ${prop}`);
            return Reflect.get(target, prop);
        },
        set: (target, prop, value) => {
            print(`Setting ${prop} to ${value}`);
            return Reflect.set(target, prop, value);
        }
    };

    try {
        const data = await fetchData();  
        print('Data fetched:', data);

         
        const proxyData = new Proxy(data, handler);
        proxyData.push('date');
        print('Updated data:', proxyData);

         
        const dataMap = new Map();
        proxyData.forEach((item, index) => dataMap.set(index, { item, length: item.length }));

         
        for (let [index, details] of dataMap.entries()) {
            print(`Index ${index}:`, details);
        }

    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
