 

 
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = {
                user: { id: 1, name: 'Alice', age: 30 },
                posts: [
                    { id: 1, title: 'JavaScript Async Features' },
                    { id: 2, title: 'Advanced JS Patterns' }
                ]
            };
            resolve(data);
        }, 1000);
    });
};

 
async function displayUserData() {
    try {
        const { user, posts } = await fetchData();
        const { name, ...otherDetails } = user;

        print(`User: ${name}`);
        print(`Details: ${JSON.stringify(otherDetails, null, 2)}`);

        posts.forEach(({ title }, index) => {
            print(`Post ${index + 1}: ${title}`);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
displayUserData();
