 
const fetchData = (url) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (url === 'validUrl') {
            resolve({ data: { user: { name: 'John Doe', age: 30 }, posts: [1, 2, 3] } });
        } else {
            reject('Invalid URL');
        }
    }, 1000);
});

const processUserData = async (url) => {
    try {
        const { data: { user, posts } } = await fetchData(url);
        const { name, age } = user;
        const messages = posts.map((post, i) => `Post ${i + 1}: ID ${post}`);

        return `User: ${name}, Age: ${age}\nPosts:\n${messages.join('\n')}`;
    } catch (error) {
        return `Error: ${error}`;
    }
};

processUserData('validUrl').then(console.log);
processUserData('invalidUrl').then(console.log);
