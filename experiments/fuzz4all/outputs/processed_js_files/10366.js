 
const complexFunction = async () => {
  try {
     
    const fetchData = async (url) => {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error fetching data from ${url}`);
      return response.json();
    };

     
    const urls = [
      'https://jsonplaceholder.typicode.com/posts',
      'https://jsonplaceholder.typicode.com/users',
    ];
    const [posts, users] = await Promise.all(urls.map(fetchData));

     
    const uniqueUserIds = new Set(posts.map(post => post.userId));
    const userIdToPostsMap = new Map();

    uniqueUserIds.forEach(userId => {
      userIdToPostsMap.set(userId, posts.filter(post => post.userId === userId));
    });

     
    const userPostSummary = users.filter(user => uniqueUserIds.has(user.id))
      .map(user => {
        const userPosts = userIdToPostsMap.get(user.id);
        return {
          ...user,
          postCount: userPosts.length,
          postTitles: userPosts.map(post => post.title)
        };
      })
      .reduce((acc, { id, name, postCount, postTitles }) => {
        acc[id] = { name, postCount, postTitles };
        return acc;
      }, {});

    print('User Post Summary:', userPostSummary);
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

 
complexFunction();
