 

const fetchData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                user: {
                    name: "Alice",
                    age: 30,
                    location: "Wonderland"
                },
                posts: [
                    { id: 1, title: "Exploring Rabbit Holes" },
                    { id: 2, title: "Adventures in Tea Parties" }
                ]
            });
        }, 1000);
    });
};

const processUserData = async () => {
    try {
        const data = await fetchData();
        
        const { user: { name, age, location }, posts } = data;
        
        const userInfo = (name, age, location) => `Name: ${name}, Age: ${age}, Location: ${location}`;
        const printPostTitles = (posts) => posts.map(({ title }) => title).forEach(console.log);

        print(userInfo(name, age, location));
        printPostTitles(posts);

    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

processUserData();
