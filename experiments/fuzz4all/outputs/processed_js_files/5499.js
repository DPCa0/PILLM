 

(async () => {
  try {
     
    const { default: axios } = await import('https://cdn.skypack.dev/axios');

     
    const fetchData = async (url) => {
      const response = await axios.get(url);
      return response.data;
    };

     
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

     
    const posts = await Promise.all([
      fetchData(`${apiUrl}/1`),
      fetchData(`${apiUrl}/2`),
      fetchData(`${apiUrl}/3`),
    ]);

     
    const [firstPost, secondPost, thirdPost] = posts;
    print(`Title of first post: ${firstPost.title}`);
    print(`Title of second post: ${secondPost.title}`);
    print(`Title of third post: ${thirdPost.title}`);

     
    const createLogger = (prefix) => (message) => print(`${prefix}: ${message}`);
    const postLogger = createLogger('Post Info');

     
    posts.map((post, index) => postLogger(`Post ${index + 1} title is: ${post.title}`));
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
