const fetch = require('node-fetch');

(async () => {
  try {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const posts = await response.json();

    const enhancedPosts = posts.map((post) => ({
      ...post,
      summary: post.body.split(' ').slice(0, 5).join(' ') + '...',
    }));

    const postsWithEvenIds = enhancedPosts.filter((post) => post.id % 2 === 0);

    const totalTitleLength = postsWithEvenIds.reduce(
      (acc, post) => acc + post.title.length,
      0
    );

    print('Enhanced Posts:', enhancedPosts);
    print('Posts with Even IDs:', postsWithEvenIds);
    print('Total Title Length of Even ID Posts:', totalTitleLength);

    const firstThreePosts = enhancedPosts.slice(0, 3);
    print('First Three Enhanced Posts:', firstThreePosts);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
  }
})();
