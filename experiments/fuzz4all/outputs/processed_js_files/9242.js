 

(async () => {
  const fetchData = () => new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = {
        user: { id: 1, name: 'Alice' },
        posts: [
          { id: 101, title: 'First Post', content: 'Hello World!' },
          { id: 102, title: 'Second Post', content: 'JavaScript is fun!' }
        ]
      };
      resolve(data);
    }, 1000);
  });

  try {
    const { user, posts } = await fetchData();
    
    const processPosts = ({ id, title, content }) => {
      print(`Post ID: ${id}`);
      print(`Title: ${title}`);
      print(`Content: ${content}`);
      print('---');
    };
    
    print(`User: ${user.name}`);
    posts.forEach(processPosts);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
