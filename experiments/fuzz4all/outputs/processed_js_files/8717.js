 

 
const fetchUserData = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
      user: { id: 1, name: 'Alice', email: 'alice@example.com' },
      posts: [
        { id: 101, title: 'Hello World', content: 'This is a blog post' },
        { id: 102, title: 'Advanced JS', content: 'Learning JavaScript features' }
      ]
    });
  }, 1000);
});

 
async function displayUserData() {
  try {
    const { user, posts } = await fetchUserData();
    
    print(`User Info: ${user.name} (${user.email})`);
    print('Recent Posts:');
    
    posts.forEach(({ id, title }) => {
      print(`- ${title} (Post ID: ${id})`);
    });
    
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

displayUserData();
