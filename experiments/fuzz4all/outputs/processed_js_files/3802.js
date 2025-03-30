 
async function fetchDataAndProcess() {
  try {
     
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();

     
    const userPosts = new Map();
    const uniqueUserIds = new Set(data.map(post => post.userId));

    uniqueUserIds.forEach(userId => {
      userPosts.set(userId, []);
    });

    data.forEach(post => {
      userPosts.get(post.userId).push(post.title);
    });

     
    const handler = {
      get(target, property) {
        if (property === 'get') {
          print(`Accessing posts for user: ${target[property].name}`);
        }
        return target[property];
      }
    };

    const proxiedUserPosts = new Proxy(userPosts, handler);

     
    await Promise.all(
      Array.from(proxiedUserPosts.keys()).map(async userId => {
        print(`User ${userId} posts:`);
        print(proxiedUserPosts.get(userId));
      })
    );
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
(async () => {
  await fetchDataAndProcess();
})();
