 
async function complexFeatureDemo() {
     
    function fetchData() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ data: 'Fetched data', status: 200 });
            }, 1000);
        });
    }

     
    const handler = {
        get: function(target, prop, receiver) {
            if (prop in target) {
                print(`Accessed property "${prop}" with value: ${target[prop]}`);
                return Reflect.get(...arguments);
            }
            return undefined;
        },
        set: function(target, prop, value) {
            print(`Set property "${prop}" with value: ${value}`);
            return Reflect.set(...arguments);
        }
    };

     
    const targetObject = {
        name: 'JavaScript',
        type: 'Programming Language'
    };

     
    const proxyObject = new Proxy(targetObject, handler);

     
    try {
        const result = await fetchData();
        print(`API call result: ${result.data}`);

         
        print(proxyObject.name);
        proxyObject.version = 'ES6';
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
complexFeatureDemo();
