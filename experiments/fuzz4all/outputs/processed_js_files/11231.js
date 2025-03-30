const fetchUserData = async (userId) => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    const retryFetch = async (url, options, retries = 3) => {
        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error('Failed to fetch');
            return response.json();
        } catch (error) {
            if (retries > 0) {
                await delay(1000);
                return retryFetch(url, options, retries - 1);
            } else {
                throw new Error('Max retries reached');
            }
        }
    };

    const userPromise = retryFetch(`https: 
    const postsPromise = retryFetch(`https: 

    try {
        const [user, posts] = await Promise.all([userPromise, postsPromise]);
        return { ...user, posts };
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const analyzeUserData = async (userId) => {
    try {
        const { name, email, posts } = await fetchUserData(userId);
        const wordCount = posts.reduce((acc, post) => acc + post.body.split(' ').length, 0);
        print(`User: ${name}, Email: ${email}, Total Word Count in Posts: ${wordCount}`);
    } catch (error) {
        console.error('Error analyzing user data:', error);
    }
};

(async () => {
    await analyzeUserData(1);
})();
