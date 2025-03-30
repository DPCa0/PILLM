 
async function fetchData(url) {
    try {
         
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
         
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
(async () => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
    
     
    const posts = await fetchData(apiUrl);
    
     
    const handler = {
        get: function(target, prop) {
            print(`Property "${prop}" has been accessed.`);
            return target[prop];
        }
    };

    const proxiedPosts = new Proxy(posts, handler);

     
    const userIds = new Set();
    proxiedPosts.forEach(post => userIds.add(post.userId));

    print('Unique userIds:', Array.from(userIds));

     
    function* postGenerator(posts) {
        for (let post of posts) {
            yield post;
        }
    }

    const gen = postGenerator(proxiedPosts);
    
     
    for (let post of gen) {
        print(`Post ID: ${post.id}, Title: ${post.title}`);
        if (post.id >= 5) break;  
    }
})();
