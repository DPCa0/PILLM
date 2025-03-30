 
import fs from 'fs/promises';

(async () => {
  try {
     
    const { default: axios } = await import('axios');

     
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const posts = response.data;

     
    const uniqueUserIds = new Set(posts.map(post => post.userId));
    const userPostCount = new Map();

     
    posts.forEach(post => {
      userPostCount.set(post.userId, (userPostCount.get(post.userId) || 0) + 1);
    });

     
    const summary = {
      totalPosts: posts.length,
      uniqueUsers: uniqueUserIds.size,
      userPostCount: [...userPostCount.entries()]
    };

     
    const dataToWrite = JSON.stringify(summary, null, 2);

     
    await fs.writeFile('summary.json', dataToWrite, 'utf8');

    print('Summary has been written to summary.json');
  } catch (error) {
     
    console.error('An error occurred:', error?.message ?? 'Unknown error');
  }
})();
