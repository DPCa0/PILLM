 

 
const mockAPI = (url) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (url === "https://api.example.com/data") {
            resolve({
                status: 200,
                json: () => Promise.resolve({ user: { name: "Jane Doe", age: 30 }, posts: [{ id: 1, content: "Hello World" }] })
            });
        } else {
            reject(new Error("404 Not Found"));
        }
    }, 1000);
});

 
const fetchData = async () => {
    try {
        const response = await mockAPI("https://api.example.com/data");

        if (response.status !== 200) throw new Error("Failed to fetch data");

        const { user: { name, age }, posts: [{ content }] } = await response.json();

        print(`User: ${name}, Age: ${age}`);
        print(`Latest Post: ${content}`);
    } catch (error) {
        console.error("Error:", error.message);
    }
};

 
fetchData();
