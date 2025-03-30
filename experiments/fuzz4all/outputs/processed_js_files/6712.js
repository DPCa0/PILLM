 

class DataFetcher {
    constructor(url) {
        this.url = url;
    }

    async fetchData() {
        try {
            const response = await fetch(this.url);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetch Error:', error);
            throw error;
        }
    }
}

class DataProcessor {
    static process({ title, body }) {
        return `${title.toUpperCase()}: ${body.slice(0, 50)}...`;
    }
}

(async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const fetcher = new DataFetcher(url);

    try {
        const posts = await fetcher.fetchData();
        const [first, second, ...others] = posts;
        
        print('First Post:', DataProcessor.process(first));
        print('Second Post:', DataProcessor.process(second));
        print(`...and ${others.length} more posts`);

    } catch (error) {
        console.error('Processing Error:', error);
    }
})();
