 
(async () => {
     
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();

     
    const userPostCounts = posts
        .filter(post => post.userId % 2 === 0)  
        .map(post => ({ userId: post.userId, titleLength: post.title.length }))  
        .reduce((acc, { userId, titleLength }) => {
            acc[userId] = (acc[userId] || 0) + titleLength;
            return acc;
        }, {});  

     
    const handler = {
        get: (target, prop) => {
            print(`Accessed property: ${prop}`);
            return target[prop];
        }
    };

    const proxy = new Proxy(userPostCounts, handler);

     
    const uniqueUserIds = new Set(posts.map(post => post.userId));

     
    uniqueUserIds.forEach(userId => {
        print(`User ${userId} has total title length: ${proxy[userId] || 0}`);
    });
})();
