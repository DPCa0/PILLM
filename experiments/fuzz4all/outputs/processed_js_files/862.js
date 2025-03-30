 
async function fetchData(url) {
     
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

 
fetchData('https://jsonplaceholder.typicode.com/posts/1')
    .then(data => {
         
        const { userId, id, title, body } = data;

         
        console.log(`Post Details:
        User ID: ${userId}
        Post ID: ${id}
        Title: ${title}
        Body: ${body}`);

         
        const userIds = new Set();
        userIds.add(userId);
        print(`Unique User IDs: ${[...userIds]}`);

         
        const postMap = new Map();
        postMap.set(id, title);
        print(`Map of Post IDs to Titles: ${JSON.stringify([...postMap])}`);

         
        const reverseBody = (text) => [...text].reverse().join('');
        print(`Reversed Body: ${reverseBody(body)}`);
    })
    .catch(error => {
         
        console.error('Processing error:', error);
    });

 
const postHandler = {
    get: (obj, prop) => {
        if (prop in obj) {
            print(`Accessing property "${prop}" with value: ${obj[prop]}`);
            return obj[prop];
        } else {
            console.warn(`Property "${prop}" not found`);
            return undefined;
        }
    }
};

const post = { userId: 1, id: 1, title: 'Sample Post', body: 'This is a sample post body' };
const proxiedPost = new Proxy(post, postHandler);

 
print(proxiedPost.title);  
print(proxiedPost.nonExistentProperty);  
