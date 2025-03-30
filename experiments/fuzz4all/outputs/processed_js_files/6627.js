 
const fetch = require('node-fetch');

 
(async () => {
     
    const _private = new WeakMap();

    class AdvancedObject {
        constructor(value) {
             
            const handler = {
                get(target, prop, receiver) {
                    if (prop === 'value') {
                        print('Accessing value through proxy');
                    }
                    return Reflect.get(...arguments);
                },
                set(target, prop, val, receiver) {
                    print(`Setting ${prop} to ${val} through proxy`);
                    return Reflect.set(...arguments);
                }
            };

            _private.set(this, { value });
            return new Proxy(this, handler);
        }

        get value() {
            return _private.get(this).value;
        }

        set value(newValue) {
            _private.get(this).value = newValue;
        }
    }

     
    const urls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/users/1'];
    const results = await Promise.allSettled(urls.map(url => fetch(url).then(res => res.json())));

     
    const dataMap = new Map();
    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            dataMap.set(urls[index], result.value);
        } else {
            console.error(`Failed to fetch data from ${urls[index]}`);
        }
    });

     
    const obj = new AdvancedObject(dataMap.get(urls[0]).title);
    print(obj.value);   

    obj.value = 'New Value';  
    print(obj.value);

     
    async function* asyncGenerator(collection) {
        for (const item of collection) {
            yield new Promise(resolve => setTimeout(() => resolve(item), 100));
        }
    }

    print('Iterating over async generator:');
    for await (const val of asyncGenerator(dataMap.values())) {
        print(val);
    }
})();
