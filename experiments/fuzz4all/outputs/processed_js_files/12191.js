 

 
const fetchUserData = (userId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { id: userId, name: 'John Doe', age: 30 };
            resolve(data);
        }, 1000);
    });
};

 
const fetchUserPosts = (userId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const posts = [
                { id: 1, title: 'Hello World' },
                { id: 2, title: 'Advanced JavaScript' }
            ];
            resolve(posts);
        }, 1000);
    });
};

 
(async () => {
    try {
        const userId = 1;
        const [userData, userPosts] = await Promise.all([fetchUserData(userId), fetchUserPosts(userId)]);

         
        const { name, age } = userData;
        const posts = userPosts.map(({ title }) => title).join(', ');

         
        const message = createMessage`User: ${name} (Age: ${age}) | Posts: ${posts}`;
        print(message);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();

 
function createMessage(strings, ...values) {
    return strings.reduce((result, str, i) => result + str + (values[i] || ''), '');
}
