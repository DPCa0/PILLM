 
async function* asyncDataFetcher(urls) {
    for (const url of urls) {
        yield fetch(url).then(response => response.json());
    }
}

const handler = {
    get: function(target, property) {
        if (property in target) {
            return target[property];
        } else {
            console.warn(`Property ${property} is not available. Returning fallback value.`);
            return async () => ({ error: "Invalid endpoint" });
        }
    }
};

const apiProxy = new Proxy({
    getUsers: async () => await fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()),
    getPosts: async () => await fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json())
}, handler);

(async () => {
    const urls = [
        'https://jsonplaceholder.typicode.com/users',
        'https://jsonplaceholder.typicode.com/posts',
        'https://jsonplaceholder.typicode.com/comments'
    ];
    
    const dataFetcher = asyncDataFetcher(urls);
    
    for await (let data of dataFetcher) {
        print(data);
    }
    
     
    try {
        const result = await apiProxy.getComments();
        print(result);
    } catch (error) {
        console.error('Caught an error: ', error);
    }
})();
