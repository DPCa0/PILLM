 

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

const processUserData = async () => {
  const userApi = 'https://jsonplaceholder.typicode.com/users';
  const postApi = 'https://jsonplaceholder.typicode.com/posts';
  
  const [users, posts] = await Promise.all([fetchData(userApi), fetchData(postApi)]);
  
  if (!users || !posts) return;

  users.forEach(user => {
    const userPosts = posts.filter(post => post.userId === user.id);
    const postTitles = userPosts.map(post => post.title).join(', ');

    print(`User: ${user.name} (${user.email}) has posts titled: ${postTitles}`);
  });
};

processUserData();
