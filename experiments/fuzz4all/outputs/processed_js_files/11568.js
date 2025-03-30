 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
    await delay(1000);  
    return { 
        user: 'Alice', 
        age: 30, 
        posts: [1, 2, 3] 
    };
}

 
async function processData() {
    try {
        const { user, age, posts } = await fetchData();
        print(`User: ${user}, Age: ${age}`);

        const processedPosts = await Promise.all(posts.map(async (postId) => {
            await delay(500);  
            return `Processed Post ${postId}`;
        }));

        print('Processed Posts:', processedPosts.join(', '));
    } catch (error) {
        console.error('Error processing data:', error);
    }
}

 
function showUserInfo({ user, age, ...rest }) {
    const userInfo = { user, age, ...rest, country: 'Unknown' };  
    const { country, ...details } = userInfo;  
    print(`Name: ${details.user}, Age: ${details.age}, Country: ${country}`);
}

 
(async () => {
    await processData();
    const data = { user: 'Alice', age: 30, posts: [1, 2, 3] };
    showUserInfo(data);
})();
