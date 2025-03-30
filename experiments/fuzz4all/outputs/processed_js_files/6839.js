 

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
            console.error("Error fetching data:", error);
        }
    }
}

const handler = {
    get: function(target, prop, receiver) {
        if (prop in target) {
            return Reflect.get(...arguments);
        }
        console.warn(`Property ${prop} does not exist`);
        return null;
    }
};

(async () => {
    const fetcher = new DataFetcher('https://jsonplaceholder.typicode.com/posts');
    const proxyFetcher = new Proxy(fetcher, handler);

    let posts = await proxyFetcher.fetchData();
    if (posts) {
        const [firstPost, secondPost, ...remainingPosts] = posts;

        print(`First Post Title: ${firstPost.title}`);
        print(`Second Post Title: ${secondPost.title}`);
        print(`Remaining Posts Count: ${remainingPosts.length}`);
    }
})();
