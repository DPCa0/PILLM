 

 
const fetchData = (url) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (url === "https://api.example.com/data") {
            resolve({
                status: 200,
                json: () => Promise.resolve({
                    user: { id: 1, name: "Alice", email: "alice@example.com" },
                    posts: [
                        { id: 101, title: "Post One" },
                        { id: 102, title: "Post Two" }
                    ],
                    settings: { theme: "dark", notifications: true }
                })
            });
        } else {
            reject({ status: 404, message: "Not Found" });
        }
    }, 1000);
});

 
async function getUserInfo(url) {
    try {
         
        const response = await fetchData(url);
        const { user, posts, settings } = await response.json();

         
        const { name, email } = user;
        const [{ title: firstPostTitle }, ...restPosts] = posts;
        
         
        print(`User: ${name} (${email})`);
        print(`First post: ${firstPostTitle}`);
        print(`Other posts:`, restPosts);
        
         
        const updatedSettings = { ...settings, notifications: false };
        print(`Updated settings:`, updatedSettings);
    } catch (error) {
         
        console.error(`Error fetching data: ${error.message}`);
    }
}

 
getUserInfo("https://api.example.com/data");
