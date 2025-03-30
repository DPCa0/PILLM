 
class ApiService {
    constructor(apiEndpoint) {
        this.apiEndpoint = apiEndpoint;
    }

    async fetchData(endpoint) {
        try {
            const response = await fetch(`${this.apiEndpoint}/${endpoint}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }
}

const processData = ({ users, posts }) => {
    const combinedData = users.map(user => {
        const userPosts = posts.filter(post => post.userId === user.id);
        return { ...user, posts: userPosts };
    });
    return combinedData;
};

(async () => {
    const apiService = new ApiService('https://jsonplaceholder.typicode.com');
    
    try {
        const [users, posts] = await Promise.all([
            apiService.fetchData('users'),
            apiService.fetchData('posts')
        ]);

        const combinedData = processData({ users, posts });
        print('Processed Data:', combinedData);

    } catch (error) {
        console.error('Error processing data:', error);
    }
})();
