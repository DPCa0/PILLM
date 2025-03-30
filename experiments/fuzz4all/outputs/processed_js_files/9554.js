 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ user: { name: 'Alice', age: 30 }, posts: [1, 2, 3] });
        }, 1000);
    });
}

 
const handler = {
    get: (target, prop) => {
        print(`Property '${prop}' accessed.`);
        return target[prop];
    }
};

 
async function processData() {
    try {
        const data = await fetchData();
        const proxyData = new Proxy(data, handler);

         
        const { user: { name = 'Unknown', age } = {} } = proxyData ?? {};

         
        print(`User: ${name}, Age: ${age}`);

         
        function* postGenerator(posts) {
            for (const post of posts ?? []) {
                yield `Post ID: ${post}`;
            }
        }

         
        const posts = [...postGenerator(proxyData.posts)];
        print('Posts:', posts);
        
         
        print(upperCase`Processed ${posts.length} posts for ${name}.`);
    } catch (error) {
        console.error('Error processing data:', error);
    }
}

 
function upperCase(strings, ...values) {
    return strings.map((str, index) => str + (values[index] || '')).join('').toUpperCase();
}

 
processData();
