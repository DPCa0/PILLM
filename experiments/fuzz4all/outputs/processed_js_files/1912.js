 
(async () => {
    const { default: axios } = await import('https://cdn.skypack.dev/axios');
    
     
    const dataHandler = {
        get: (target, prop) => {
            if (prop in target) {
                print(`Accessing property "${prop}" with value:`, target[prop]);
                return target[prop];
            } else {
                throw new Error(`Property "${prop}" not found`);
            }
        },
        set: (target, prop, value) => {
            print(`Setting property "${prop}" to value:`, value);
            target[prop] = value;
            return true;
        }
    };

     
    const state = new Proxy({
        user: {
            name: 'John Doe',
            age: 30
        },
        posts: []
    }, dataHandler);

     
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5');
        state.posts = response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
    }

     
    function* postGenerator(posts) {
        for (const post of posts) {
            yield post;
        }
    }

     
    const postsIter = postGenerator(state.posts);
    for (const post of postsIter) {
        print(`Post #${post.id}:`, post.title);
    }

     
    const uniqueAction = Symbol('uniqueAction');
    const actions = {
        [uniqueAction]: () => console.log("Performing a unique action!")
    };

     
    actions[uniqueAction]();
})();
