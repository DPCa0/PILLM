 
const fetch = require('node-fetch');

const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

 
async function fetchPosts() {
  try {
    const response = await fetch(apiUrl);
    const posts = await response.json();

     
    const [firstPost] = posts;
    const { title: firstTitle, body: firstBody } = firstPost;

    print('First Post Title:', firstTitle);

     
    const longPosts = posts.filter(({ body }) => body.length > 150);

     
    const users = await Promise.all(
      longPosts.map(async ({ userId }) => {
        const userResponse = await fetch(`https: 
        return userResponse.json();
      })
    );

     
    const uniqueUsers = [...new Set(users.map(user => user.name))];
    print('Unique Users of Long Posts:', uniqueUsers);

     
    const extendedFirstPost = {
      ...firstPost,
      summary: `${firstTitle.substring(0, 50)}...`,
    };
    print('Extended First Post:', extendedFirstPost);
    
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

 
(async () => {
  await fetchPosts();
})();
