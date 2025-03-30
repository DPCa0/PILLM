 
(async () => {
    const { default: axios } = await import('https://cdn.skypack.dev/axios');
    
     
    const handler = {
        get(target, property) {
            if (property in target) {
                return target[property];
            } else {
                return `Property ${property} does not exist`;
            }
        }
    };

    const targetObject = { greeting: "Hello, World!", name: "Complex JS Example" };
    const proxy = new Proxy(targetObject, handler);

    print(proxy.greeting);  
    print(proxy.unknown);  

     
    const fetchData = async (url) => {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error(`Error fetching data from ${url}`, error);
        }
    };

    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2'
    ];

    const dataPromises = urls.map(url => fetchData(url));
    
    Promise.all(dataPromises)
        .then(results => results.forEach(data => console.log(data)))
        .catch(error => console.error('Error with dataPromises', error));
    
     
    const uniqueNumbers = new Set([1, 2, 3, 4, 5, 5, 3, 2, 1]);
    print([...uniqueNumbers]);  

     
    const numbers = [1, 2, 3, 4, 5];
    const squared = numbers.map(num => num ** 2);
    print(squared);  

    const sum = numbers.reduce((acc, num) => acc + num, 0);
    print(sum);  

     
    console.log(`
        Name: ${proxy.name}
        Greeting: ${proxy.greeting}
    `);
})();
