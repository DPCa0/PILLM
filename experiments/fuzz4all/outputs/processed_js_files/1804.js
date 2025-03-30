(async () => {
     
    const handler = {
        apply(target, thisArg, argumentsList) {
            print(`Called with args: ${argumentsList}`);
            return target(argumentsList[0]) * 2;
        }
    };

    function multiplyByTwo(n) {
        return n * 2;
    }

    const proxyFunction = new Proxy(multiplyByTwo, handler);

     
    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            print(`Fetched data: ${JSON.stringify(data)}`);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

     
    const map = new Map();
    map.set('first', proxyFunction(5));  
    map.set('second', proxyFunction(10));  

    map.forEach((value, key) => print(`${key}: ${value}`));

     
    await fetchData('https://jsonplaceholder.typicode.com/todos/1');
})();
