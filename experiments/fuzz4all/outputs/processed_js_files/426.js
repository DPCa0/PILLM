 
const processData = async () => {
  try {
     
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    
     
    const uniqueUserIds = new Set(data.map(post => post.userId));
    const userPosts = new Map();
    
    uniqueUserIds.forEach(id => {
      userPosts.set(id, data.filter(post => post.userId === id));
    });
    
     
    function* mapEntriesIterator(map) {
      for (let [key, value] of map.entries()) {
        yield { userId: key, posts: value };
      }
    }
    
     
    for (const { userId, posts } of mapEntriesIterator(userPosts)) {
      print(`User ${userId} has ${posts.length} posts.`);
    }
    
     
    const handler = {
      get(target, prop, receiver) {
        print(`Accessing property "${prop}"`);
        return Reflect.get(...arguments);
      }
    };
    
    const proxiedUserPosts = new Proxy(userPosts, handler);
    
     
    print(proxiedUserPosts.get(1));
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
};

 
processData();
