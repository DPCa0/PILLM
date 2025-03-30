 

 
export const fetchData = async (url) => {
    const response = await fetch(url);
    return await response.json();
};

 
import { fetchData } from './utils.js';

(async () => {
    try {
        const url = 'https://jsonplaceholder.typicode.com/posts';
        const posts = await fetchData(url);
        
        const topPosts = posts
            .filter(post => post.userId === 1)
            .map(({ id, title, body }) => ({ id, title, body }))
            .slice(0, 5);

        topPosts.forEach(({ id, title, body }) => {
            print(`Post #${id}:\nTitle: ${title}\nBody: ${body}\n`);
        });
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
    }
})();
