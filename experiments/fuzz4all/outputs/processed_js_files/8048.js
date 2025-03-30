 
async function* fetchUserData(urls) {
    for (const url of urls) {
        yield fetch(url).then(response => response.json());
    }
}

const cacheHandler = {
    cache: new Map(),
    get(target, prop) {
        if (!this.cache.has(prop)) {
            this.cache.set(prop, target[prop]);
        }
        return this.cache.get(prop);
    }
};

function transformData([userData, postCount]) {
    return {
        name: userData.name.toUpperCase(),
        email: userData.email.toLowerCase(),
        posts: postCount * 2  
    };
}

(async function main() {
    const urls = [
        'https://jsonplaceholder.typicode.com/users/1',
        'https://jsonplaceholder.typicode.com/users/2'
    ];
    
    const proxy = new Proxy({ urls }, cacheHandler);
    const userDataPromises = fetchUserData(proxy.urls);

    const results = [];
    for await (let userPromise of userDataPromises) {
        const postPromise = fetch('https://jsonplaceholder.typicode.com/posts?userId=1')
            .then(response => response.json())
            .then(posts => posts.length);

        const [userData, postCount] = await Promise.all([userPromise, postPromise]);
        const transformedData = transformData([userData, postCount]);
        
        results.push(transformedData);
    }
    
    print(results);
})();
