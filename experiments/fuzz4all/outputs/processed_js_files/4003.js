 

 
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ userId: 1, username: "advancedUser", posts: [101, 102, 103] });
        }, 1000);
    });
};

 
const loggerProxyHandler = {
    get: (target, prop) => {
        print(`Property '${prop}' accessed`);
        return target[prop];
    }
};

async function fetchAndDisplayUserData() {
    try {
         
        const userData = await fetchData();
        
         
        const { userId, username } = userData;

         
        const proxiedData = new Proxy(userData, loggerProxyHandler);

         
        print(`User ID: ${proxiedData.userId}, Username: ${proxiedData.username}`);

         
        const postIds = proxiedData.posts.map(postId => `Post ID: ${postId}`);
        print(`User's Posts: ${postIds.join(", ")}`);

    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

 
fetchAndDisplayUserData();
