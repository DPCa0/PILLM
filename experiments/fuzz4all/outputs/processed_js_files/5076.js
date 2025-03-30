 

const fetchUserData = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const users = {
                1: { name: 'Alice', age: 28 },
                2: { name: 'Bob', age: 32 },
                3: { name: 'Charlie', age: 25 }
            };
            const user = users[id];
            if (user) {
                resolve(user);
            } else {
                reject(`User with ID ${id} not found`);
            }
        }, 1000);
    });
};

const fetchUserPosts = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const posts = {
                1: ['Post 1', 'Post 2'],
                2: ['Post A', 'Post B'],
                3: ['Post X', 'Post Y']
            };
            const userPosts = posts[id];
            if (userPosts) {
                resolve(userPosts);
            } else {
                reject(`Posts for user ID ${id} not found`);
            }
        }, 1000);
    });
};

(async () => {
    try {
        const userId = 1;
        const [user, posts] = await Promise.all([fetchUserData(userId), fetchUserPosts(userId)]);
        const { name, age } = user;
        print(`User: ${name}, Age: ${age}`);
        print(`Posts: ${posts.join(', ')}`);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
})();
