 

 
async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
        posts: [
          { id: 101, title: 'Post One' },
          { id: 102, title: 'Post Two' },
        ],
      });
    }, 1000);
  });
}

 
(async () => {
  try {
    const { user, posts } = await fetchData();

     
    console.log(`User Info:
      Name: ${user.name}
      Email: ${user.email}
    `);

     
    const enhancedPosts = [
      ...posts,
      { id: 103, title: 'Post Three', userId: user.id },
    ];

     
    print('Posts:');
    for (const { title } of enhancedPosts) {
      print(` - ${title}`);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
