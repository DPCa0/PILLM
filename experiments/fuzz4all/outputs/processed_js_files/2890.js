 

const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const mockData = {
                user: { name: 'Alice', age: 25, location: 'Wonderland' },
                posts: [
                    { id: 1, title: 'Adventures in Wonderland', content: 'Exploring...' },
                    { id: 2, title: 'Thoughts on Tea', content: 'Tea is great!' },
                ]
            };
            url ? resolve(mockData) : reject('Invalid URL');
        }, 1000);
    });
};

const processData = async (url) => {
    try {
        const { user, posts } = await fetchData(url);
        const { name, age, location } = user;
        const [firstPost, ...otherPosts] = posts;

        print(`User: ${name}, Age: ${age}, Location: ${location}`);
        print(`First Post: ${firstPost.title} - ${firstPost.content}`);
        
        otherPosts.forEach(({ title, content }) => {
            print(`Other Post: ${title} - ${content}`);
        });

    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
};

processData('https://mockapi.com/data');
