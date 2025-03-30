 
const advancedFeatureExample = (function() {
     
    const privateData = new WeakMap();

    class ComplexObject {
        constructor(name) {
             
            privateData.set(this, { name });
        }
        
         
        get info() {
            const handler = {
                get(target, prop) {
                    if (prop === 'name') {
                        return `Private: ${target[prop]}`;
                    }
                    return target[prop];
                }
            };
            return new Proxy(privateData.get(this), handler);
        }
    }

     
    async function fetchData() {
        const promise1 = Promise.resolve('Data1');
        const promise2 = Promise.resolve('Data2');

        const [data1, data2] = await Promise.all([promise1, promise2]);
        return `${data1}, ${data2}`;
    }

     
    function* idGenerator() {
        let id = 1;
        while (true) {
            yield id++;
        }
    }

     
    const obj = new ComplexObject('Sensitive Info');

     
    (async function() {
        print(obj.info.name);  
        const data = await fetchData();
        print('Fetched Data:', data);

         
        const ids = idGenerator();
        print('Generated IDs:', ids.next().value, ids.next().value, ids.next().value);
    })();
})();
