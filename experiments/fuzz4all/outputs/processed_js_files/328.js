 

 
const fetchData = (endpoint) => new Promise((resolve) => {
    setTimeout(() => {
        if (endpoint === 'user') resolve({ id: 1, name: 'John Doe' });
        if (endpoint === 'posts') resolve([
            { id: 1, title: 'First Post', content: 'Lorem ipsum dolor sit amet.' },
            { id: 2, title: 'Second Post', content: 'Consectetur adipiscing elit.' }
        ]);
    }, 1000);
});

const fetchAllData = async () => {
    try {
         
        const [{ id, name }, posts] = await Promise.all([
            fetchData('user'),
            fetchData('posts')
        ]);

         
        const userPosts = posts.map(({ title, content }) => ({
            userName: name,
            postTitle: title,
            postContent: content
        }));

         
        for (const [index, { userName, postTitle, postContent }] of userPosts.entries()) {
            print(`Post ${index + 1}:`);
            print(`User: ${userName}`);
            print(`Title: ${postTitle}`);
            print(`Content: ${postContent}\n`);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

fetchAllData();
