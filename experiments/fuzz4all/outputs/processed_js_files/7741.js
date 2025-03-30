 

const fetchUserData = async (userId) => {
   
  const simulateNetworkRequest = (id) => 
    new Promise((resolve) => setTimeout(() => resolve({ id, name: `User${id}`, posts: [1, 2, 3] }), 1000));

  const user = await simulateNetworkRequest(userId);

   
  const fetchPosts = (postIds) =>
    Promise.all(postIds.map((postId) =>
      new Promise((resolve) => setTimeout(() => resolve({ id: postId, content: `Content of post ${postId}` }), 500))
    ));

  const { posts } = user;
  const postDetails = await fetchPosts(posts);

   
  return { ...user, postDetails };
};

(async () => {
  try {
    const userId = 42;
    const { id, name, postDetails } = await fetchUserData(userId);

    print(`Fetched data for user ${name} (ID: ${id}):`);
    postDetails.forEach(({ id, content }) => print(`Post ${id}: ${content}`));
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
