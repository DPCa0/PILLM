const fetch = require('node-fetch');

(async () => {
    try {
         
        const urls = [
            'https://jsonplaceholder.typicode.com/posts/1',
            'https://jsonplaceholder.typicode.com/posts/2',
            'https://jsonplaceholder.typicode.com/posts/3'
        ];
        
        const fetchPromises = urls.map(url => fetch(url).then(res => res.json()));

        const [post1, post2, post3] = await Promise.all(fetchPromises);
        
         
        const posts = [post1, post2, post3].map(({ id, title, body }) => ({
            id,
            summary: `${title.substring(0, 15)}...`,
            body: body.replace(/\s+/g, ' ').substring(0, 50) + '...'
        }));

         
        const postMap = new Map();
        const seenSummaries = new Set();

        posts.forEach(post => {
            if (!seenSummaries.has(post.summary)) {
                postMap.set(post.id, post);
                seenSummaries.add(post.summary);
            }
        });

         
        const handler = {
            get: function(target, prop, receiver) {
                if (typeof target[prop] === 'function') {
                    return function(...args) {
                        print(`Called method: ${String(prop)}`);
                        return target[prop].apply(this, args);
                    };
                }
                return Reflect.get(target, prop, receiver);
            }
        };

        const postAPI = new Proxy({
            getPostById: (id) => postMap.get(id),
            getAllPosts: () => Array.from(postMap.values())
        }, handler);

         
        const getById = Symbol('getPostById');
        
        postAPI[getById] = postAPI.getPostById;

         
        print('All Posts:', postAPI.getAllPosts());
        print('Post 1:', postAPI[getById](1));

    } catch (error) {
        console.error('Error fetching posts:', error);
    }
})();
