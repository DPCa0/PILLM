 
async function complexFeatureDemo() {
    try {
         
        const { default: axios } = await import('https://cdn.skypack.dev/axios');

         
        const fetchData = async (url) => {
            const { data } = await axios.get(url);
            return data;
        };

         
        const [posts, users] = await Promise.all([
            fetchData('https://jsonplaceholder.typicode.com/posts'),
            fetchData('https://jsonplaceholder.typicode.com/users')
        ]);

         
        const uniqueUserIds = new Set(posts.map(post => post.userId));
        const userMap = new Map(users.map(user => [user.id, user]));

         
        const postsByUniqueUsers = Array.from(uniqueUserIds).map(userId => {
            return {
                user: userMap.get(userId),
                posts: posts.filter(post => post.userId === userId)
            };
        });

        print(postsByUniqueUsers);
    } catch (error) {
        console.error('Error:', error);
    }
}

complexFeatureDemo();
