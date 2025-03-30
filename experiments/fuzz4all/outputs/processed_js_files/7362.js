 

 
const fetchData = (endpoint) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const mockData = {
                user: { name: 'John Doe', age: 30 },
                posts: [{ id: 1, content: 'Hello World' }, { id: 2, content: 'Learning JS' }]
            };
            resolve(mockData[endpoint]);
        }, 1000);
    });
};

 
async function processUserData() {
    try {
         
        const [user, posts] = await Promise.all([fetchData('user'), fetchData('posts')]);

         
        const { name, age } = user;

         
        const userProfile = { name, age, posts: [...posts] };

         
        const formattedPosts = userProfile.posts.map(({ id, content }) => ({
            postId: id,
            postContent: content.toUpperCase()
        }));

         
        print(`User: ${name}, Age: ${age}`);
        print('Formatted Posts:', formattedPosts);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
processUserData();
