 
(async function() {
     
    const secret = Symbol('secret');
    const obj = { name: "Complex Object", [secret]: "Hidden Value" };

     
    const map = new Map([[1, 'one'], [2, 'two'], [3, 'three']]);
    const set = new Set([1, 2, 3, 4, 5]);

     
    const handler = {
        get: function(target, prop, receiver) {
            if (prop === 'secret') return 'This is a secret!';
            return Reflect.get(...arguments);
        }
    };
    const proxyObj = new Proxy(obj, handler);

     
    function* mapIterator(map) {
        for (let [key, value] of map.entries()) {
            yield `${key}: ${value}`;
        }
    }

     
    async function fetchData(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

     
    try {
        print(`Hello, ${proxyObj.name}`);
        print(`Secret Message: ${proxyObj.secret}`);
        
        for (let entry of mapIterator(map)) {
            print(`Map Entry - ${entry}`);
        }

        print(`Set has number 3: ${set.has(3)}`);

        const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
        print(`Fetched Data: ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
        console.error('An error occurred:', error);
    }

     
    const promises = [
        fetchData('https://jsonplaceholder.typicode.com/posts/2'),
        fetchData('https://jsonplaceholder.typicode.com/posts/3')
    ];
    Promise.all(promises).then(results => {
        results.forEach((result, index) => {
            print(`Result ${index + 1}: ${JSON.stringify(result, null, 2)}`);
        });
    });
})();
