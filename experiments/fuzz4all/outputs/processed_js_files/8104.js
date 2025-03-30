 

class DataFetcher {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    async fetchData(endpoint) {
        try {
            const response = await fetch(`${this.apiUrl}${endpoint}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Fetch Error:', error);
            return null;
        }
    }
}

const apiHandler = {
    get: (target, prop) => {
        return async (...args) => {
            if (prop in target) {
                return await target[prop](...args);
            } else {
                console.error(`Method ${prop} does not exist`);
                return null;
            }
        };
    }
};

(async () => {
    const apiProxy = new Proxy(new DataFetcher('https://jsonplaceholder.typicode.com'), apiHandler);

    const posts = await apiProxy.fetchData('/posts');
    if (posts) {
        const randomPost = posts[Math.floor(Math.random() * posts.length)];
        print('Random Post:', randomPost);
    }

     
    await apiProxy.nonExistentMethod();
})();
