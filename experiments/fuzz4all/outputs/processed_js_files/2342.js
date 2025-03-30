 

 
const fetchUserData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ name: 'Alice', age: 25, location: 'Wonderland' });
        }, 1000);
    });
};

 
const fetchUserPosts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(['Post 1', 'Post 2', 'Post 3']);
        }, 1500);
    });
};

(async () => {
    try {
         
        const userPromise = fetchUserData();
        const postsPromise = fetchUserPosts();
        
         
        const [{ name, ...otherDetails }, posts] = await Promise.all([userPromise, postsPromise]);
        
         
        print(`User Details: ${JSON.stringify({ name, ...otherDetails })}`);
        print(`Posts: ${[...posts].join(', ')}`);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
