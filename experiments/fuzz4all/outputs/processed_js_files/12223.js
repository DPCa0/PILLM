 

 
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = {
                user: { id: 1, name: 'Alice' },
                posts: [
                    { id: 1, title: 'Hello World', content: 'First post content' },
                    { id: 2, title: 'Advanced Features', content: 'Discussing advanced JS features' }
                ]
            };
            resolve(data);
        }, 1000);
    });
};

 
const processData = async () => {
    try {
        const { user, posts } = await fetchData();

         
        const [firstPost, ...remainingPosts] = posts;

        print(`User: ${user.name}`);
        print(`First Post Title: ${firstPost.title}`);
        
         
        remainingPosts.forEach(({ title, content }) => {
            print(`Post: ${title} - ${content}`);
        });

         
        const uniqueTitles = new Set(posts.map(post => post.title));
        print(`Unique Post Titles: ${[...uniqueTitles].join(', ')}`);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

 
class Utility {
    static printMessage(message) {
        print(`Utility Message: ${message}`);
    }
}

 
processData();

 
Utility.printMessage('All data processed successfully.');
