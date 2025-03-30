 
async function fetchData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();

     
    const uniqueUserIds = [...new Set(data.map(post => post.userId))];
    const userPostsMap = new Map();

    uniqueUserIds.forEach(userId => {
      userPostsMap.set(userId, data.filter(post => post.userId === userId));
    });

     
    function* generatePosts(map) {
      for (let [userId, posts] of map.entries()) {
        yield { userId, posts };
      }
    }

     
    const handler = {
      get(target, property) {
        return property in target ? target[property] : `Property ${property} not found`;
      }
    };

    const enhancedData = new Proxy(userPostsMap, handler);

     
    for (const userPosts of generatePosts(enhancedData)) {
      print(`User ${userPosts.userId}:`);
      print(userPosts.posts);
    }

     
    const [firstPost, ...restPosts] = data;
    print('First Post:', firstPost);
    print('Remaining Posts Count:', restPosts.length);
  } catch (error) {
    console.error('Fetching data failed:', error);
  }
}

 
fetchData();
