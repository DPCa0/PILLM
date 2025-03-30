 
 

const apiEndpoint = 'https://jsonplaceholder.typicode.com/posts';

 
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

 
const fetchHandler = {
    apply: function(target, thisArg, argumentsList) {
        print(`Fetching data from: ${argumentsList[0]}`);
        return target.apply(thisArg, argumentsList);
    }
};

const proxiedFetch = new Proxy(fetch, fetchHandler);

 
async function fetchData(url) {
    const response = await proxiedFetch(url);
    if (!response.ok) throw new Error(`Error fetching data: ${response.status}`);
    return response.json();
}

 
(async () => {
    try {
        const idGen = idGenerator();
        const postData = await fetchData(apiEndpoint);

         
        const postDetails = await Promise.all(postData.slice(0, 5).map(async (post) => {
            const userDetails = await fetchData(`https: 
            return {
                postId: idGen.next().value,
                title: post.title,
                body: post.body,
                userName: userDetails.name
            };
        }));

         
        postDetails.forEach(detail => {
            console.log(`
                Post ID: ${detail.postId}
                Title: ${detail.title}
                Body: ${detail.body}
                Author: ${detail.userName}
            `);
        });

    } catch (error) {
        console.error(`An error occurred: ${error.message}`);
    }
})();
