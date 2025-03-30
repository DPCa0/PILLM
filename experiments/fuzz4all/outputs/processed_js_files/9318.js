 
(async () => {
   
  const { default: axios } = await import('https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js');

   
  const apiEndpoint = 'https://jsonplaceholder.typicode.com/posts';

   
  const axiosProxy = new Proxy(axios, {
    get(target, prop, receiver) {
      if (prop === 'get') {
        return async function (...args) {
          print(`Fetching: ${args[0]}`);
          const response = await Reflect.apply(target[prop], target, args);
          print(`Response Received: `, response.data);
          return response;
        };
      }
      return Reflect.get(target, prop, receiver);
    }
  });

   
  const fetchData = async (url) => {
    try {
      const response = await axiosProxy.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

   
  async function* generatePosts(url) {
    const posts = await fetchData(url);
    for (const post of posts) {
      yield post;
    }
  }

   
  (async () => {
    const postsGenerator = generatePosts(apiEndpoint);
    for await (const post of postsGenerator) {
      print('Post:', post);
    }
  })();
})();
