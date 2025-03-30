 
(async () => {
    try {
         
        const uniqueIds = new Set([1, 2, 3, 4, 5]);
        const dataMap = new Map();

         
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        await delay(1000);

         
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await response.json();

         
        posts.forEach(post => {
            if (uniqueIds.has(post.userId)) {
                dataMap.set(post.id, post);
            }
        });

         
        const handler = {
            get: (target, prop) => {
                if (prop in target) {
                    return target[prop];
                }
                return `Property ${prop} not found`;
            }
        };

        const proxy = new Proxy(dataMap, handler);

         
        for (let [id, { title, body }] of proxy) {
            print(`Post ID: ${id}`);
            print(`Title: ${title}`);
            print(`Body: ${body}`);
            print('------------------------');
        }

    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
