 
(async () => {
    const fetchData = () => new Promise((resolve) => setTimeout(() => resolve({
        user: { name: 'Alice', age: 30 },
        posts: [{ id: 1, title: 'ES6 Rocks!' }, { id: 2, title: 'JavaScript Async/Await' }]
    }), 1000));

    const uniqueArray = arr => [...new Set(arr)];

    try {
        const { user: { name, age }, posts } = await fetchData();

        print(`User: ${name}, Age: ${age}`);
        
        const titles = posts.map(post => post.title);
        print('Unique Titles:', uniqueArray(titles));
        
        const dataMap = new Map(posts.map(({ id, title }) => [id, title]));
        print('Data Map:', [...dataMap.entries()]);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
