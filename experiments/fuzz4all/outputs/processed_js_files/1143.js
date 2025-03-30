 

class DataService {
    constructor(url) {
        this.url = url;
    }

    async fetchData(endpoint) {
        try {
            const response = await fetch(`${this.url}${endpoint}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Fetch error: ${error.message}`);
        }
    }
}

const processData = async () => {
    const service = new DataService('https://jsonplaceholder.typicode.com');
    
    const [users, posts] = await Promise.all([
        service.fetchData('/users'),
        service.fetchData('/posts')
    ]);

    const enrichedData = posts.map(post => {
        const user = users.find(user => user.id === post.userId);
        return {
            ...post,
            userName: user ? user.name : 'Unknown',
            userEmail: user ? user.email : 'Unknown'
        };
    });

    const summary = enrichedData.map(({ id, title, userName, userEmail }) => 
        `Post ID: ${id}\nTitle: ${title}\nAuthor: ${userName} (${userEmail})\n`
    ).join('\n');

    print(`Post Summary:\n\n${summary}`);
};

processData();
