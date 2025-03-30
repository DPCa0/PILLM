 

class DataFetcher {
    constructor(url) {
        this.url = url;
    }

    async fetchData() {
        try {
            const response = await fetch(this.url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}

const processAndLogData = async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const fetcher = new DataFetcher(url);
    const posts = await fetcher.fetchData();

    if (posts) {
        for (const { id, title, body } of posts.slice(0, 5)) {
            print(`Post ID: ${id}`);
            print(`Title: ${title}`);
            print(`Body: ${body}`);
            print('---');
        }
    }
};

processAndLogData();
