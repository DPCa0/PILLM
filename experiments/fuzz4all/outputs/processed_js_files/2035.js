const fetchUserData = async () => {
  const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' }
  ];
  
  return new Promise((resolve) => {
    setTimeout(() => resolve(users), 1000);
  });
};

const logUserInfo = async () => {
  try {
    const users = await fetchUserData();
    
    const userPromises = users.map(async (user) => {
      const { default: axios } = await import('https://cdn.skypack.dev/axios');
      
      const response = await axios.get(`https: 
      return { ...user, posts: response.data };
    });
    
    const userData = await Promise.all(userPromises);
    
    const formattedData = userData.reduce((acc, user) => {
      const postTitles = user.posts.map(post => post.title).join(', ');
      acc[user.name] = `Email: ${user.email}, Posts: ${postTitles}`;
      return acc;
    }, {});

    console.table(formattedData);
    
  } catch (error) {
    console.error('Error fetching user info:', error);
  }
};

logUserInfo();
