const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const processUserData = async () => {
  try {
    const users = await fetchData('https://jsonplaceholder.typicode.com/users');
    const userPromises = users.map(async (user) => {
      const posts = await fetchData(`https: 
      return { ...user, posts };
    });

    const userData = await Promise.all(userPromises);
    const summarizedData = userData.map(({ id, name, posts }) => ({
      userId: id,
      userName: name,
      postCount: posts.length,
    }));

    summarizedData.sort((a, b) => b.postCount - a.postCount);

    console.table(summarizedData);
  } catch (error) {
    console.error('Error processing user data:', error);
  }
};

processUserData();
