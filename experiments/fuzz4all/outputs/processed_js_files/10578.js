 

 
function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                user: { name: 'John Doe', age: 30 },
                posts: [
                    { title: 'Post 1', content: 'Content of post 1' },
                    { title: 'Post 2', content: 'Content of post 2' }
                ]
            });
        }, 1000);
    });
}

 
async function displayData() {
    try {
         
        const { user, posts } = await fetchData();

         
        const { name, age } = user;
        print(`User: ${name}, Age: ${age}`);

         
        posts.forEach(({ title, content }) => {
            print(`\nTitle: ${title}\nContent: ${content}`);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
displayData();
