 

 
async function fetchData(endpoint) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: `Data from ${endpoint}` });
        }, 1000);
    });
}

 
function* endpointGenerator(endpoints) {
    for (const endpoint of endpoints) {
        yield fetchData(endpoint);
    }
}

 
const loggingHandler = {
    get: (target, property) => {
        print(`Accessing property: ${property}`);
        return target[property];
    }
};

 
const apiEndpoints = new Proxy({
    user: '/api/user',
    posts: '/api/posts',
    comments: '/api/comments'
}, loggingHandler);

 
async function processEndpoints() {
    const generator = endpointGenerator(Object.values(apiEndpoints));
    let result = generator.next();

    while (!result.done) {
        const data = await result.value;
        print(data.data);
        result = generator.next();
    }
}

 
processEndpoints();
