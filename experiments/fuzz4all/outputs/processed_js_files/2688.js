 

 
const fetchUserData = async (userId) => {
    const simulatedResponse = new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: userId,
                name: 'Jane Doe',
                email: 'jane.doe@example.com',
                address: { city: 'Wonderland', zip: '12345' },
            });
        }, 1000);
    });

    const user = await simulatedResponse;
    return user;
};

 
const fetchPostsForUser = async (userId) => {
    const simulatedResponse = new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { postId: 1, content: 'Hello World!' },
                { postId: 2, content: 'Learning JavaScript!' },
            ]);
        }, 1000);
    });

    const posts = await simulatedResponse;
    return posts;
};

 
(async () => {
    try {
        const userId = 1;
        const userPromise = fetchUserData(userId);
        const postsPromise = fetchPostsForUser(userId);

        const [user, posts] = await Promise.all([userPromise, postsPromise]);

        const {
            name,
            email,
            address: { city },
        } = user;
        print(`User: ${name}, Email: ${email}, City: ${city}`);

        print('Posts:');
        posts.forEach(({ postId, content }) => {
            print(`Post ${postId}: ${content}`);
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
