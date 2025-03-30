 

const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch data: ${response.statusText}`);
    return await response.json();
};

const processUserData = async () => {
    try {
        const [userData, posts] = await Promise.all([
            fetchData('https://jsonplaceholder.typicode.com/users/1'),
            fetchData('https://jsonplaceholder.typicode.com/posts?userId=1')
        ]);

        const { name, email, address: { city } } = userData;
        print(`User: ${name} (${email}) from ${city}`);
        
        print(`Posts:`);
        posts.forEach(({ id, title }) => print(`  ${id}. ${title}`));

    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};

processUserData();
