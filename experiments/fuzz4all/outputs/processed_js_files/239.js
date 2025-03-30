 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ userId: 1, userName: 'Jane Doe', posts: [1, 2, 3] });
    }, 2000);
  });
};

 
const fetchPost = async (postId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ postId, content: `Content of post ${postId}` });
    }, 1000);
  });
};

 
const main = async () => {
  try {
    const { userId, userName, posts } = await fetchData();
    print(`User ID: ${userId}, User Name: ${userName}`);

     
    const postsContent = await Promise.all(posts.map(postId => fetchPost(postId)));
    
    postsContent.forEach(post => {
      print(`Post ID: ${post.postId}, Content: ${post.content}`);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
main();
