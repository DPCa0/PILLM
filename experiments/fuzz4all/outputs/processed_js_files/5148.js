 

function* dataGenerator(urls) {
    for (const url of urls) {
        yield fetch(url).then(res => res.json());
    }
}

async function fetchData(generator) {
    const results = [];
    for (const promise of generator) {
        results.push(await promise);
    }
    return results;
}

const handler = {
    get: async (target, prop) => {
        if (prop in target) {
            print(`Fetching: ${prop}`);
            const data = await fetchData(target[prop]);
            return data;
        }
        return undefined;
    }
};

const dataFetcher = new Proxy({
    posts: dataGenerator(['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2']),
    comments: dataGenerator(['https://jsonplaceholder.typicode.com/comments/1', 'https://jsonplaceholder.typicode.com/comments/2'])
}, handler);

 
(async () => {
    const posts = await dataFetcher.posts;
    print('Posts:', posts);
    const comments = await dataFetcher.comments;
    print('Comments:', comments);
})();
