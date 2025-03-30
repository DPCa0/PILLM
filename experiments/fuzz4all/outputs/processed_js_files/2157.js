 

const fetchDataAndProcess = async () => {
  try {
     
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) throw new Error('Network response was not ok');
    
     
    const data = await response.json();

     
    const userIds = new Set();
    const postCountMap = new Map();

    data.forEach(({ userId }) => {
      userIds.add(userId);
      postCountMap.set(userId, (postCountMap.get(userId) || 0) + 1);
    });

     
    for (const userId of userIds) {
      const postCount = postCountMap.get(userId);
      print(`User ${userId} has ${postCount} posts.`);
    }
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
};

 
fetchDataAndProcess();
