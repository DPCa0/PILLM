 

const fetchUserData = async (userId) => {
     
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { userId, name: `User${userId}`, posts: [101, 102, 103] };
};

const fetchUserPosts = async (postIds) => {
     
    await new Promise(resolve => setTimeout(resolve, 1000));
    return postIds.map(id => ({ postId: id, content: `Content for post ${id}` }));
};

async function* userPostsGenerator(userIds) {
    for (const id of userIds) {
        const userData = await fetchUserData(id);
        const posts = await fetchUserPosts(userData.posts);
        yield { userData, posts };
    }
}

(async () => {
    const userIds = [1, 2, 3];
    const gen = userPostsGenerator(userIds);

    for await (const user of gen) {
        print(`User ID: ${user.userData.userId}, Name: ${user.userData.name}`);
        for (const post of user.posts) {
            print(`Post ID: ${post.postId}, Content: ${post.content}`);
        }
        print('---');
    }
})();
