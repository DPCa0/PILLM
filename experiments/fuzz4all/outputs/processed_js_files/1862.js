 
(async function advancedFeaturesDemo() {
   
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

   
  async function fetchData() {
    print('Fetching data...');
    await delay(1000);
    return {
      user: { id: 1, name: 'John Doe' },
      posts: [
        { id: 101, title: 'JavaScript Async/Await' },
        { id: 102, title: 'Understanding Promises' }
      ]
    };
  }

  try {
     
    const { user, posts } = await fetchData();

     
    print(`User: ${user.name} (ID: ${user.id})`);
    print('Posts:');
    posts.forEach(post => {
      print(`- [${post.id}] ${post.title}`);
    });

     
    const dataMap = new Map();
    dataMap.set('user', user);
    dataMap.set('posts', posts);

    for (let [key, value] of dataMap) {
      print(`Key: ${key}, Value:`, value);
    }

  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
