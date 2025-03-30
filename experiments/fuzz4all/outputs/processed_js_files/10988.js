 

class DataProcessor {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    async fetchData(endpoint) {
        try {
            const response = await fetch(`${this.apiUrl}${endpoint}`);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    async processData() {
        const [userData, postsData] = await Promise.all([
            this.fetchData('/users'),
            this.fetchData('/posts')
        ]);

        if (userData && postsData) {
            this.displayProcessedData(userData, postsData);
        }
    }

    displayProcessedData(users, posts) {
        const usersMap = new Map(users.map(user => [user.id, user.name]));

        const postsByUser = posts.reduce((acc, post) => {
            const { userId, title } = post;
            const userName = usersMap.get(userId) || 'Unknown';
            if (!acc[userName]) acc[userName] = [];
            acc[userName].push(title);
            return acc;
        }, {});

        Object.entries(postsByUser).forEach(([userName, titles]) => {
            print(`\n${userName}'s Posts:`);
            titles.forEach((title, index) => print(`${index + 1}. ${title}`));
        });
    }
}

(async () => {
    const apiURL = 'https: 
    const processor = new DataProcessor(apiURL);
    await processor.processData();
})();
