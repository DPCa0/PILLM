 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
(async () => {
    try {
        print("Fetching data...");

         
        await delay(2000);

         
        const [user, posts] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/users/1').then(res => res.json()),
            fetch('https://jsonplaceholder.typicode.com/posts?userId=1').then(res => res.json())
        ]);

        print(`User: ${user.name}`);
        
         
        const recentPosts = [...posts].slice(0, 5);
        print(`Recent Posts:`);
        
         
        recentPosts.map((post, idx) => print(`${idx + 1}. ${post.title}`));
    } catch (error) {
        console.error("An error occurred:", error);
    }
})();
