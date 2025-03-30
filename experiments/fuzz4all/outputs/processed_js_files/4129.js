 
(async () => {
    try {
         
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) throw new Error('Network response was not ok.');

         
        const posts = await response.json();
        const processedPosts = posts.map(({ id, title, body }) => ({ id, title, body }));

         
        const userIds = new Set(posts.map(post => post.userId));

         
        const totalBodyLength = posts.reduce((total, { body }) => total + body.length, 0);

         
        print(`Processed ${processedPosts.length} posts.`);
        print(`Unique User IDs: ${[...userIds].join(', ')}`);
        print(`Total length of all posts' bodies: ${totalBodyLength} characters`);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
