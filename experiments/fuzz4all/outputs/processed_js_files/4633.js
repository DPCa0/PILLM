 
(async () => {
    const API_URL = 'https://jsonplaceholder.typicode.com/posts';

     
    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    };

     
    const processPosts = (posts) => {
        return posts.map(({ id, title, body }) => ({ id, title, body }));
    };

     
    try {
        const posts = await fetchData(API_URL);
        const processedPosts = processPosts(posts);
        print('Processed Posts:', processedPosts.slice(0, 5));
    } catch (error) {
        console.error('Error processing posts:', error);
    }
})();
