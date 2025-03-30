 

const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`An error has occured: ${response.status}`);
    return response.json();
};

const processUserData = async () => {
    try {
        const userData = await fetchData('https://jsonplaceholder.typicode.com/users');
        const [firstUser, ...remainingUsers] = userData;  
        print('First User:', firstUser);

        const userPostsPromises = remainingUsers.map(user =>
            fetchData(`https: 
        );

        const allUserPosts = await Promise.all(userPostsPromises);
        print('All Remaining Users Posts:', allUserPosts);

        const summarizePosts = (posts) => posts.map(({ title }) => title);  
        const summarizedPosts = allUserPosts.map(summarizePosts).flat();  
        print('Summarized Titles of Posts:', summarizedPosts);
        
    } catch (error) {
        console.error('Error:', error.message);
    }
};

processUserData();
