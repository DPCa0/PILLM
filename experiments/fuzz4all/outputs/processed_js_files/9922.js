class APIClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    async get(endpoint) {
        const response = await fetch(`${this.baseURL}${endpoint}`);
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    }
}

const fetchData = async () => {
    const api = new APIClient('https://jsonplaceholder.typicode.com');
    const [users, posts] = await Promise.all([
        api.get('/users'), 
        api.get('/posts')
    ]);
    return { users, posts };
};

(async () => {
    try {
        const data = await fetchData();
        const userPostMap = new Map(data.users.map(user => {
            const userPosts = data.posts.filter(post => post.userId === user.id);
            return [user.name, userPosts.map(post => post.title)];
        }));

        print("User Post Titles:");
        for (const [user, titles] of userPostMap.entries()) {
            console.group(user);
            titles.forEach(title => print(title));
            console.groupEnd();
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
