 
import fetch from 'node-fetch';

 
(async function fetchData() {
    try {
         
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await response.json();

         
        posts.slice(0, 5).forEach(({ id, title, body }) => {
            print(`Post ID: ${id}\nTitle: ${title}\nBody: ${body}\n`);
        });

         
        const userIds = new Set(posts.map(post => post.userId));
        print(`Unique User IDs: ${[...userIds].join(', ')}`);

         
        const postsByUser = new Map();
        posts.forEach(post => {
            if (!postsByUser.has(post.userId)) {
                postsByUser.set(post.userId, []);
            }
            postsByUser.get(post.userId).push(post.title);
        });

         
        userIds.forEach(userId => {
            print(`User ${userId} Posts:`);
            print(postsByUser.get(userId)?.join(', ') || 'No posts found');
        });

    } catch (error) {
         
        console.error(`Failed to fetch data: ${error.message}`);
    }
})();
