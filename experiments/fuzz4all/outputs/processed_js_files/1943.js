 
import fetch from 'node-fetch';

 
const apiHandler = {
    get: async (target, prop) => {
        const response = await fetch(`https: 
        return response.json();
    }
};

 
const apiProxy = new Proxy({}, apiHandler);

 
async function fetchDataAndProcess() {
    try {
         
        const [posts, users] = await Promise.all([apiProxy.posts, apiProxy.users]);

         
        const userMap = new Map(users.map(user => [user.id, user]));

         
        const uniqueTitles = new Set(posts.map(post => post.title));

         
        function* filterPosts(posts) {
            for (const post of posts) {
                if (uniqueTitles.has(post.title)) {
                    yield {
                        ...post,
                        user: userMap.get(post.userId)
                    };
                    uniqueTitles.delete(post.title);
                }
            }
        }

         
        for (const post of filterPosts(posts)) {
            print(`Title: ${post.title}`);
            print(`Author: ${post.user.name}`);
            print('----------------------');
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
fetchDataAndProcess();
