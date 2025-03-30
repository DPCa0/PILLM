(async () => {
   
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();

     
    const uniqueUserIds = new Set(data.map(post => post.userId));
    const userPostsMap = new Map();

    uniqueUserIds.forEach(userId => {
      userPostsMap.set(userId, data.filter(post => post.userId === userId));
    });

     
    const handler = {
      set(target, property, value) {
        print(`Setting property ${property} with value`, value);
        target[property] = value;
        return true;
      }
    };

    const proxiedUserPostsMap = new Proxy(userPostsMap, handler);

     
    proxiedUserPostsMap.set(1, [...proxiedUserPostsMap.get(1), { id: 101, title: "New Post", body: "This is a new post." }]);

     
    for (const [userId, posts] of proxiedUserPostsMap) {
      print(`User ID: ${userId}, Posts Count: ${posts.length}`);
    }

  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
})();
