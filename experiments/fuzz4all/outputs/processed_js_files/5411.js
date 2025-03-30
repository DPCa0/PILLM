 
(async () => {
  try {
     
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) throw new Error('Network response was not ok');

     
    const posts = await response.json();

     
    const summaries = posts.map(({ userId, id, title, body }) => ({
      userId,
      id,
      title,
      summary: body.slice(0, 50) + '...'
    }));

     
    const userSummaries = summaries
      .filter(post => post.userId === 1)
      .reduce((acc, post) => {
        acc[post.id] = post;
        return acc;
      }, {});

     
    print(`User 1 has ${Object.keys(userSummaries).length} posts`);
    for (const [id, post] of Object.entries(userSummaries)) {
      print(`Post ID: ${id}, Title: ${post.title}, Summary: ${post.summary}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
})();
