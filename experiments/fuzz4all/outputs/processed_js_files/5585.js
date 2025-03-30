 
(async () => {
  const fetchData = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: { name: 'Alice', age: 25 },
          posts: [
            { id: 1, title: 'First Post', content: 'Hello, world!' },
            { id: 2, title: 'Second Post', content: 'Advanced JavaScript!' }
          ],
          meta: { lastLogin: new Date().toISOString(), active: true }
        });
      }, 1000);
    });
  };

  try {
    const { user, posts, meta: { lastLogin } } = await fetchData();
    print(`User: ${user.name}, Last Login: ${new Date(lastLogin).toLocaleString()}`);
    
    const totalContentLength = posts.reduce((sum, { content }) => sum + content.length, 0);
    print(`Total length of post contents: ${totalContentLength}`);

    posts.map(({ title, content }) => ({
      title,
      preview: content.substring(0, 10) + '...'
    })).forEach(({ title, preview }) => {
      print(`Title: ${title}, Preview: ${preview}`);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
