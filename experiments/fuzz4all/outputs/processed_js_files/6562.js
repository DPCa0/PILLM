const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};

const processData = ({ users, posts }) => {
  const userPosts = new Map();
  for (const post of posts) {
    const { userId, title, body } = post;
    if (!userPosts.has(userId)) userPosts.set(userId, []);
    userPosts.get(userId).push({ title, body });
  }
  
  return users.map(user => ({
    ...user,
    posts: userPosts.get(user.id) || []
  }));
};

const displayUserData = (usersData) => {
  for (const user of usersData) {
    print(`\nUser: ${user.name} (${user.email})`);
    for (const post of user.posts) {
      print(` - ${post.title}: ${post.body}`);
    }
  }
};

const main = async () => {
  const urls = [
    'https://jsonplaceholder.typicode.com/users',
    'https://jsonplaceholder.typicode.com/posts'
  ];
  
  const [users, posts] = await Promise.all(urls.map(url => fetchData(url)));
  
  if (users && posts) {
    const usersData = processData({ users, posts });
    displayUserData(usersData);
  }
};

main();
