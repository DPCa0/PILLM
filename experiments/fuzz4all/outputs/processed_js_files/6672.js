const fetch = require('node-fetch');

(async () => {
  try {
     
    const urls = [
      'https://jsonplaceholder.typicode.com/posts/1',
      'https://jsonplaceholder.typicode.com/posts/2'
    ];
    
    const requests = urls.map(url => fetch(url).then(response => response.json()));
    const results = await Promise.all(requests);
    
     
    const [{ userId: firstUserId, ...firstPost }, { userId: secondUserId, ...secondPost }] = results;
    
     
    const formatPost = ({ title, body }, prefix = 'Post:') => `
      ${prefix} ${title}
      ---
      ${body}
    `;
    
     
    const uniqueUserIds = new Set([firstUserId, secondUserId]);
    uniqueUserIds.forEach(userId => print(`UserId: ${userId}`));
    
    print(formatPost(firstPost, 'First Post:'));
    print(formatPost(secondPost, 'Second Post:'));

     
    print('First post userId:', results[0]?.userId ?? 'Unknown');
    
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
})();
