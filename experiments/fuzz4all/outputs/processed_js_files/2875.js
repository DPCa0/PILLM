 

const fetchData = () => {
     
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = {
                user: {
                    name: 'Jane Doe',
                    age: 28,
                    location: 'New York'
                },
                posts: [
                    { title: 'Post 1', content: 'Content 1' },
                    { title: 'Post 2', content: 'Content 2' }
                ]
            };
            resolve(data);
        }, 1000);
    });
};

const processData = async () => {
    try {
        const { user, posts } = await fetchData();  
        const userMessage = `User: ${user.name}, Age: ${user.age}, Location: ${user.location}`;  
        const postsMessage = posts.map(post => `Title: ${post.title}, Content: ${post.content}`).join('\n');
        
        print(userMessage);
        print('Posts:\n', postsMessage);

        const [firstPost, ...restPosts] = posts;  
        print('First Post:', firstPost);
        print('Remaining Posts:', restPosts);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

processData();
