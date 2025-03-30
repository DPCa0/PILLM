 

 
const fetchData = async (url) => {
    const fakeAPIResponse = new Map([
        ["https://api.example.com/user", { id: 1, name: "John Doe", age: 30 }],
        ["https://api.example.com/posts", [
            { id: 1, title: "Hello World", content: "This is a post." },
            { id: 2, title: "Advanced Features", content: "This is another post." }
        ]]
    ]);
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = fakeAPIResponse.get(url);
            data ? resolve(data) : reject("Data not found");
        }, 1000);
    });
};

 
const getUserDataAndPosts = async () => {
    try {
         
        const [user, posts] = await Promise.all([
            fetchData("https://api.example.com/user"),
            fetchData("https://api.example.com/posts")
        ]);

         
        const { name, age } = user;

         
        print(`User: ${name}, Age: ${age}`);
        print("Posts:");
        posts.forEach(({ title, content }) => {
            print(`- ${title}: ${content}`);
        });
        
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

 
getUserDataAndPosts();
