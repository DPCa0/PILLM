 

 
const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`https: 
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
  }
};

 
const processUserData = async () => {
  const users = await fetchData('users');
  const posts = await fetchData('posts');

  if (users && posts) {
     
    const userPosts = users.map(({ id, name, email }) => {
      const userPostsCount = posts.reduce((count, post) => (post.userId === id ? count + 1 : count), 0);
      return { name, email, userPostsCount };
    });

     
    userPosts.forEach(({ name, email, userPostsCount }) =>
      console.log(`${name} (${email}) has written ${userPostsCount} posts.`)
    );
  }
};

 
(async () => {
  print('Fetching and processing user data...');
  await processUserData();
  print('Processing complete.');
})();
