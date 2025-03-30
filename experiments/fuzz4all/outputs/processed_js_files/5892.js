 

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
}

async function processUserData() {
    try {
        const userUrl = 'https://jsonplaceholder.typicode.com/users';
        const [user] = await fetchData(userUrl);
        
        const { name, email, address: { city } } = user;

        console.log(`User Info:
        Name: ${name}
        Email: ${email}
        City: ${city}`);
        
        const postsUrl = `https: 
        const posts = await fetchData(postsUrl);
        
        const titles = posts.map(({ title }) => title).join(', ');
        print(`Post Titles: ${titles}`);

    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

processUserData();
