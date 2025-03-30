const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`An error has occured: ${response.status}`);
  return await response.json();
};

const processUserData = async (userId) => {
  try {
    const [user, posts, albums] = await Promise.all([
      fetchData(`https: 
      fetchData(`https: 
      fetchData(`https: 
    ]);

    const processedData = {
      ...user,
      posts: posts.map(post => ({
        title: post.title.toUpperCase(),
        bodySnippet: post.body.substring(0, 50),
      })),
      albums: albums.map(album => album.title.split(' ').reverse().join(' ')),
    };

    print(JSON.stringify(processedData, null, 2));
  } catch (error) {
    console.error('Error processing user data:', error);
  }
};

const debounce = (func, wait) => {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
};

const optimizeDataProcessing = debounce(processUserData, 2000);

optimizeDataProcessing(1);
optimizeDataProcessing(2);
