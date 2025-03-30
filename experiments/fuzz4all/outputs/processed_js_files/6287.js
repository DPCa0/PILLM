class DataService {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }
    
    async fetchData() {
        const response = await fetch(this.endpoint);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    }
}

const dataService = new DataService('https://jsonplaceholder.typicode.com/posts');

const processData = async () => {
    try {
        const posts = await dataService.fetchData();
        print(`Fetched ${posts.length} posts`);
        
         
        const titles = new Set();
        const postMap = new Map(posts.map(post => [post.id, post]));
        
        postMap.forEach(post => {
            if (post.title) titles.add(post.title);
        });
        
        print(`Unique Titles: ${titles.size}`);
        
         
        const [firstPost, secondPost, ...remainingPosts] = posts;
        print('First Post:', firstPost);
        print('Second Post:', secondPost);
        print('Remaining Posts:', remainingPosts.length);
        
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
};

 
(async () => {
    await processData();
})();
