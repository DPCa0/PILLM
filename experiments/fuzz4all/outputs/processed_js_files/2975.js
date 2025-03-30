 

async function* fetchData(ids) {
    for (const id of ids) {
        yield fetch(`https: 
    }
}

async function processPosts(ids) {
    const posts = [];
    for await (const post of fetchData(ids)) {
        posts.push(post);
    }
    return posts;
}

const handler = {
    get: (target, prop) => {
        if (prop === 'getRandomPost') {
            return () => target[Math.floor(Math.random() * target.length)];
        }
        return target[prop];
    }
};

(async () => {
    try {
        const postIDs = [1, 2, 3, 4, 5];
        const posts = await processPosts(postIDs);

        const proxiedPosts = new Proxy(posts, handler);

        print("All Posts:", proxiedPosts);
        print("Random Post:", proxiedPosts.getRandomPost());
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
})();
