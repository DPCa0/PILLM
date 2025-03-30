 

(async function () {
    try {
         
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) throw new Error('Network response was not ok');

         
        const posts = await response.json();
        const [firstPost, secondPost, ...otherPosts] = posts;

         
        const { id, title, body } = firstPost;

         
        print(`First Post - ID: ${id}, Title: ${title}`);
        print(`Excerpt: ${body.substring(0, 50)}...`);

         
        const showPostTitles = (...posts) => {
            posts.forEach(({ title }, index) => {
                print(`Post ${index + 1} Title: ${title}`);
            });
        };

         
        showPostTitles(secondPost, ...otherPosts);

    } catch (error) {
        console.error('Fetch error:', error);
    }
})();
