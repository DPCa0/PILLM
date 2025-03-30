 

 
const fetchData = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve({
            user: { id: 1, name: 'Alice' },
            posts: [
                { id: 101, title: 'Post One', content: 'Content of post one.' },
                { id: 102, title: 'Post Two', content: 'Content of post two.' },
            ]
        });
    }, 1000);
});

 
const processUserData = async () => {
    try {
         
        const data = await fetchData();

         
        const { user, posts } = data;
        
         
        print(`User: ${user.name}, ID: ${user.id}`);
        print('Posts:');
        posts.map(({ id, title, content }) =>
            console.log(`- [ID: ${id}] ${title}: ${content}`)
        );

    } catch (error) {
         
        console.error('Error fetching data:', error);
    }
};

 
processUserData();
