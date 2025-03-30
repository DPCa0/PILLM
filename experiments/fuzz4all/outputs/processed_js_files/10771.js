 
class DataFetcher {
    constructor(url) {
        this.url = url;
    }

    async fetchData() {
        try {
            let response = await fetch(this.url);
            if (!response.ok) throw new Error('Network response was not ok');
            let data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
}

(async function main() {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const fetcher = new DataFetcher(url);

    const data = await fetcher.fetchData();
    if (data) {
         
        const [first, second, , fourth] = data;
        print('First Post:', first);
        print('Second Post:', second);

         
        const titles = data
            .filter(post => post.userId === 1)
            .map(post => post.title);

        print('Titles by User 1:', titles);
    }
})();
