(async () => {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const fetchData = async (url) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error fetching data: ${response.statusText}`);
        return response.json();
    };

    const processUserData = async (userId) => {
        try {
            const userData = await fetchData(`https: 
            const postsData = await fetchData(`https: 

            print(`User Info: ${userData.name} (${userData.email})`);
            print('User Posts:');
            postsData.forEach(post => print(`- ${post.title}`));

            print(`Data processing completed for user ${userId}`);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const userIds = [1, 2, 3];
    for await (const userId of userIds) {
        await processUserData(userId);
        await delay(1000);   
    }

    print('All user data has been processed.');
})();
