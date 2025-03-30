 
(async function complexExample() {
     
    const fetchData = () => new Promise(resolve => setTimeout(() => {
        resolve({
            user: { id: 1, name: 'Alice', email: 'alice@example.com' },
            posts: [{ id: 101, title: 'First Post' }, { id: 102, title: 'Second Post' }]
        });
    }, 1000));

     
    const { user, posts } = await fetchData();

     
    const { name, email } = user;
    const [firstPost, ...otherPosts] = posts;

     
    print(`User: ${name} (${email})`);
    print(`First Post: ${firstPost.title}`);
    if (otherPosts.length) {
        print(`Other Posts: ${otherPosts.map(post => post.title).join(', ')}`);
    }

     
    const updatedUser = { ...user, name: 'Alice Updated' };
    print(`Updated User: ${updatedUser.name}`);

     
    const calculateAverage = (...numbers) => numbers.reduce((a, b) => a + b, 0) / numbers.length;
    print(`Average: ${calculateAverage(10, 20, 30)}`);
})();
