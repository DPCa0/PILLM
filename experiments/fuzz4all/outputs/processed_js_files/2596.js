 

 
const fetchData = () => new Promise(resolve => setTimeout(() => resolve({
    user: { id: 1, name: 'Alice' },
    posts: [
        { id: 1, title: 'Post One', content: 'Content One' },
        { id: 2, title: 'Post Two', content: 'Content Two' }
    ]
}), 1000));

 
function* postGenerator(posts) {
    for (let post of posts) {
        yield post;
    }
}

 
async function getUserData() {
    try {
         
        const { user, posts } = await fetchData();
        print(`User ID: ${user.id}, Name: ${user.name}`);
        
         
        const generator = postGenerator(posts);
        for (let post of generator) {
            const { id, title, content } = post;
            print(`Post ID: ${id}, Title: "${title}", Content: "${content}"`);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
(async () => {
    await getUserData();
})();
