 

class DataFetcher {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    async fetchData(endpoint) {
        const response = await fetch(`${this.apiUrl}${endpoint}`);
        const data = await response.json();
        return data;
    }

     
    createFetcher(endpoint) {
        return async () => await this.fetchData(endpoint);
    }
}

async function main() {
    const api = new DataFetcher('https://jsonplaceholder.typicode.com');

     
    const { title, body } = await api.createFetcher('/posts/1')();
    print(`Post Title: ${title}\nContent: ${body}`);

    const { name: userName } = await api.createFetcher('/users/1')();
    print(`User Name: ${userName}`);

     
    const [comments, albums] = await Promise.all([
        api.createFetcher('/comments')(),
        api.createFetcher('/albums')()
    ]);

     
    const combinedData = [...comments.slice(0, 5), ...albums.slice(0, 5)];
    combinedData.forEach((item, index) => print(`Item ${index + 1}:`, item));
}

main().catch(error => console.error('Error:', error));
