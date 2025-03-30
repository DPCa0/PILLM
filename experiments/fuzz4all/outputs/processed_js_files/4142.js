 

 
const fetchData = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      user: { id: 1, name: 'Alice' },
      posts: [
        { id: 1, title: 'First Post', content: 'Hello, world!' },
        { id: 2, title: 'Second Post', content: 'Learning JS is fun!' }
      ]
    });
  }, 1000);
});

 
async function getUserAndPosts() {
  try {
     
    const data = await fetchData();
    
     
    const { user, posts } = data;
    
     
    const userWithStatus = { ...user, online: true };
    
    print('User Details:', userWithStatus);
    
     
    const processPosts = (...allPosts) => {
      allPosts.forEach(({ title, content }, index) => {
        print(`Post ${index + 1}: ${title} - ${content}`);
      });
    };
    
     
    processPosts(...posts);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
getUserAndPosts();
