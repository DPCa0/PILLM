 

(async function() {
     
    const fetchData = async (url) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const fakeData = {
                    '/user': { name: 'Alice', age: 30 },
                    '/posts': [
                        { id: 1, title: 'Hello World' },
                        { id: 2, title: 'Advanced JavaScript' }
                    ]
                };
                resolve(fakeData[url]);
            }, 1000);
        });
    };

     
    const getData = async () => {
        try {
            const [user, posts] = await Promise.all([
                fetchData('/user'),
                fetchData('/posts')
            ]);

             
            const { name, age } = user;
            print(`User: ${name}, Age: ${age}`);

             
            const postMap = new Map(posts.map(post => [post.id, post]));
            print('Post Titles: ', [...postMap.values()].map(post => post.title));

             
            const postTitles = new Set(posts.map(post => post.title));
            print('Unique Post Titles:', [...postTitles]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    await getData();
})();
