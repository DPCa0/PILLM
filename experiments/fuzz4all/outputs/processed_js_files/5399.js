 
(async () => {
     
    const { default: _ } = await import('https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/lodash.min.js');
    
     
    const data = [1, 2, 3, 4, 5, 6];
    const chunked = _.chunk(data, 2);

     
    const target = { message: "Hello, World!" };
    const handler = {
        set(obj, prop, value) {
            print(`Property '${prop}' set to '${value}'`);
            obj[prop] = value;
            return true;
        }
    };

    const proxy = new Proxy(target, handler);
    proxy.message = "Hello, JavaScript!";

     
    async function fetchData(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

     
    function* idGenerator() {
        let id = 1;
        while (true) {
            yield id++;
        }
    }

    const gen = idGenerator();

    print("Chunked Data: ", chunked);
    print("Generated ID: ", gen.next().value);
    print("Generated ID: ", gen.next().value);

     
    const jsonData = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    print("Fetched JSON Data: ", jsonData);
})();
