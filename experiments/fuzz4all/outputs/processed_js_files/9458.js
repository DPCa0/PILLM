 
import fetch from 'node-fetch';

 
(async function() {
    try {
         
        const [userData, postData] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json()),
            fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json())
        ]);

         
        const uniqueUsernames = new Set(userData.map(user => user.username));
        
         
        const userPosts = userData.flatMap(user => ({
            [user.username]: postData.filter(post => post.userId === user.id).map(post => post.title)
        }));

         
        const userPostMap = new Map();
        userPosts.forEach(userPost => {
            const username = Object.keys(userPost)[0];
            userPostMap.set(username, userPost[username]);
        });

         
        uniqueUsernames.forEach((username) => {
            const [firstTitle, ...otherTitles] = userPostMap.get(username) || [];
            print(`User: ${username}\n  First Post: ${firstTitle}\n  Other Posts: ${otherTitles.join(', ')}\n`);
        });

    } catch (error) {
         
        console.error('Error fetching data:', error?.message ?? 'Unknown error');
    }
})();
