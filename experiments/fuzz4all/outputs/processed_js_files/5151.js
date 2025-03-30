const fetchData = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};

const processPosts = async () => {
  try {
    const posts = await fetchData();
    const processedPosts = posts.map(({ id, title, body }) => ({
      id,
      title: title.toUpperCase(),
      summary: body.slice(0, 50) + '...'
    }));

    const postMap = new Map(processedPosts.map(post => [post.id, post]));
    
     
    const handler = {
      set: (target, prop, value) => {
        if (!value || typeof value.id !== 'number') {
          throw new Error('Each entry must have a numerical "id".');
        }
        target.set(prop, value);
        return true;
      }
    };

    const proxiedMap = new Proxy(postMap, handler);

     
    proxiedMap.set(101, { id: 101, title: 'PROXY POST', summary: 'This is an added post via Proxy...' });

     
    for (const [id, { title, summary }] of proxiedMap) {
      print(`ID: ${id}, Title: ${title}, Summary: ${summary}`);
    }
  } catch (error) {
    console.error('Error processing posts:', error);
  }
};

processPosts();
