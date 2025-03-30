 

 
const fetchData = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ 
                user: { name: "John Doe", age: 30 },
                stats: { followers: 230, views: 1200 }
            });
        }, 1000);
    });
};

 
const processData = async () => {
    try {
        const { user: { name, age }, stats: { followers, views } } = await fetchData();
        
        const summary = `
            User Info:
            Name: ${name}
            Age: ${age}

            Stats:
            Followers: ${followers}
            Views: ${views}
        `;

        print(summary.trim());
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

 
processData();
