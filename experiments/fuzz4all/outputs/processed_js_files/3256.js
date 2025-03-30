const fetch = require('node-fetch');

(async () => {
     
    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error(`Fetch error: ${error}`);
        }
    };

     
    const handler = {
        get: (target, prop) => {
            print(`Accessing property ${prop}`);
            return target[prop];
        }
    };

    const user = { name: 'Alice', age: 30 };
    const proxiedUser = new Proxy(user, handler);

    print(proxiedUser.name);  
    print(proxiedUser.age);   

     
    const map = new Map();
    map.set('x', 1);
    map.set('y', 2);

     
    for (const [key, value] of map) {
        print(`Key: ${key}, Value: ${value}`);
    }

     
    const apiUrl = 'https://jsonplaceholder.typicode.com/todos/1';
    const { userId, title } = await fetchData(apiUrl) || {};
    print(`User ID: ${userId}, Title: ${title}`);

     
    const numbers = [1, 2, 3, 3, 4, 5, 5];
    const uniqueNumbers = [...new Set(numbers)];
    print(`Unique numbers: ${uniqueNumbers}`);

     
    const urls = [
        'https://jsonplaceholder.typicode.com/todos/1',
        'https://jsonplaceholder.typicode.com/todos/2'
    ];

    try {
        const results = await Promise.all(urls.map(fetchData));
        results.forEach(data => print(`Fetched data: ${JSON.stringify(data)}`));
    } catch (err) {
        console.error(`Error fetching data: ${err}`);
    }

})();
