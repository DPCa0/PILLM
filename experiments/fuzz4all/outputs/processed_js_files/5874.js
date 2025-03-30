const fetch = require('node-fetch');

(async () => {
   
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3',
  ];

  try {
    const fetchPromises = urls.map(url => fetch(url).then(response => response.json()));
    const results = await Promise.all(fetchPromises);

     
    const postsById = results.reduce((acc, post) => {
      acc[post.id] = post;
      return acc;
    }, {});

     
    const handler = {
      get: (target, property) => {
        print(`Accessing property '${property}' of post`);
        return target[property];
      }
    };

    const proxiedPosts = new Proxy(postsById, handler);

    print(proxiedPosts[1].title);
    print(proxiedPosts[2].title);

  } catch (error) {
    console.error('Error fetching posts:', error);
  }
})();
