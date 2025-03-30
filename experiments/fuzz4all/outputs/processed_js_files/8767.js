 

 
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                user: { id: 1, name: "Alice" },
                posts: [
                    { id: 1, title: "First Post", content: "Hello World" },
                    { id: 2, title: "Second Post", content: "JavaScript is fun" },
                ],
            });
        }, 1000);
    });
}

async function processUserData() {
    try {
         
        const { user, posts } = await fetchData();

        print(`User: ${user.name}`);
        print("Posts:");

         
        posts.map(({ title, content }) => 
            console.log(`- ${title}: ${content}`)
        );
        
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

 
(async () => {
    await processUserData();
})();
