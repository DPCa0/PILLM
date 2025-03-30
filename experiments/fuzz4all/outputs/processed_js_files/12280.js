 

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const processData = async () => {
  try {
    const [users, posts] = await Promise.all([
      fetchData('https://jsonplaceholder.typicode.com/users'),
      fetchData('https://jsonplaceholder.typicode.com/posts')
    ]);

    const usersMap = new Map(users.map(user => [user.id, user.name]));

    const postInfo = posts.map(({ userId, title }) => ({
      userName: usersMap.get(userId) || 'Unknown User',
      title
    }));

    print(postInfo);
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
};

processData();
