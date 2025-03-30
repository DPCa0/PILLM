 
const apiEndpoint = 'https://jsonplaceholder.typicode.com/posts';

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchDataWithDelay(url, delayTime) {
  try {
     
    const [response] = await Promise.all([fetch(url), delay(delayTime)]);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();

     
    const [{ title }] = data;
    print('First Post Title:', title);

    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

 
(async () => {
  const posts = await fetchDataWithDelay(apiEndpoint, 1000);

  if (posts) {
     
    const userIds = [...new Set(posts.map(({ userId }) => userId))];
    print('Unique User IDs:', userIds);

     
    const postsByUserId = new Map();
    posts.forEach(post => {
      if (!postsByUserId.has(post.userId)) {
        postsByUserId.set(post.userId, []);
      }
      postsByUserId.get(post.userId).push(post);
    });

     
    for (const [userId, userPosts] of postsByUserId.entries()) {
      print(`User ${userId} has ${userPosts.length} posts`);
    }
  }
})();
