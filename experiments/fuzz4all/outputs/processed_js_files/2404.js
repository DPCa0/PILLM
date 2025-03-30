 
const fetchUserData = async (userId) => {
     
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: userId, name: "John Doe", posts: [1, 2, 3] });
        }, 1000);
    });
};

const fetchPostDetails = async (postId) => {
     
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ postId, content: `Content for post ${postId}` });
        }, 500);
    });
};

const getPostContents = async (userId) => {
    const { id, name, posts } = await fetchUserData(userId);
    
    print(`Fetched data for ${name} (User ID: ${id})`);

     
    const postPromises = posts.map(async (postId) => {
        const { content } = await fetchPostDetails(postId);
        return content;
    });

     
    return (await Promise.all(postPromises)).reduce((acc, postContent, index) => {
        acc[`Post ${index + 1}`] = postContent;
        return acc;
    }, {});
};

(async () => {
    const userPosts = await getPostContents(42);
    print(userPosts);
})();
