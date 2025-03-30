 

 
const target = {};
const handler = {
    get: (obj, prop) => {
        print(`Property '${prop}' has been accessed.`);
        return prop in obj ? obj[prop] : 42;  
    },
    set: (obj, prop, value) => {
        print(`Property '${prop}' has been set to '${value}'.`);
        obj[prop] = value;
        return true;
    }
};

const proxy = new Proxy(target, handler);

 
function* asyncGenerator() {
    yield fetch('https://jsonplaceholder.typicode.com/posts/1');
    yield fetch('https://jsonplaceholder.typicode.com/posts/2');
}

 
async function fetchPosts() {
    const gen = asyncGenerator();
    const results = [];
    for (let request of gen) {
        const response = await request;
        const data = await response.json();
        results.push(data);
    }
    return results;
}

 
const postsMap = new Map();

 
(async function main() {
    proxy.greeting = 'Hello, Proxy!';  

    const posts = await fetchPosts();
    posts.forEach((post, index) => {
        postsMap.set(index + 1, post.title);  
    });

    print('Posts stored in Map:');
    postsMap.forEach((title, id) => {
        print(`Post ${id}: ${title}`);
    });

    print(proxy.greeting);  
})();
