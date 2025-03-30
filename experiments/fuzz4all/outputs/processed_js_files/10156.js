const fetch = require('node-fetch');  

 
(async () => {
  try {
     
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();

     
    const [{ title, body }] = posts;

     
    print(`First Post Title: ${title}`);
    print(`First Post Body: ${body}`);

     
    const upperCaseTitles = posts.map(({ title }) => title.toUpperCase());

     
    const wordSet = new Set();

     
    posts.reduce((_, { body }) => {
      body.split(/\s+/).forEach(word => wordSet.add(word));
    }, null);

    print(`Unique words count across all posts: ${wordSet.size}`);

     
    const handler = {
      get: (target, prop) => {
        if (prop in target) {
          print(`Accessing property '${prop}'`);
          return target[prop];
        } else {
          print(`Property '${prop}' not found`);
        }
      }
    };

     
    const proxyPost = new Proxy(posts[0], handler);

     
    print(`Post ID through proxy: ${proxyPost.id}`);

  } catch (error) {
    console.error('Error fetching posts:', error);
  }
})();
