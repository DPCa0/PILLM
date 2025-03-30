 
async function fetchDataAndProcess() {
    try {
         
        let response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) throw new Error('Network response was not ok');
        let data = await response.json();
        
         
        let processedData = data.slice(0, 5).map(post => ({
            summary: `${post.id}: ${post.title}`,
            content: post.body.substring(0, 50) + '...'
        }));

         
        let [firstPost, ...otherPosts] = processedData;
        
        print('First Post Summary:', firstPost.summary);
        
        print('Other Posts:', ...otherPosts.map(post => post.summary));

    } catch (error) {
         
        console.error('Fetch error:', error);
    }
}

 
(async () => {
    await fetchDataAndProcess();
})();
