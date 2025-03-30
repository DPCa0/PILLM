 
import fetch from 'node-fetch';

 
(async function advancedFeaturesDemo() {
  try {
     
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();

     
    const { title, body } = posts[0];

     
    print(`First Post Title: ${title}\nPost Body: ${body}`);

     
    const userIds = posts
      .filter(post => post.id < 10)
      .map(({ userId }) => userId);

     
    const uniqueUserIds = [...new Set(userIds)];

    print('Unique User IDs for Posts with ID < 10:', uniqueUserIds);

     
    const safeAccessExample = posts[0]?.nonexistentProperty ?? 'Property does not exist';
    print(safeAccessExample);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
