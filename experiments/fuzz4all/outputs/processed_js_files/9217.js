 

 
(async () => {
  const modulePath = 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js';

   
  const { default: _ } = await import(modulePath);

   
  const users = [
    { user: 'Alice', age: 25, active: true },
    { user: 'Bob', age: 30, active: false },
    { user: 'Charlie', age: 35, active: true }
  ];

   
  const activeUsers = _.filter(users, { active: true });
  print('Active Users:', activeUsers);

   
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await response.json();

   
  const sortedPosts = _.sortBy(posts, post => post.title.length);
  print('Posts sorted by title length:', sortedPosts.slice(0, 5));

   
  const handler = {
    get(target, property) {
      print(`Accessed property ${property}`);
      return target[property];
    }
  };

  const proxyPosts = new Proxy(sortedPosts, handler);
  print('First post title:', proxyPosts[0].title);

   
  const uniqueKey = Symbol('uniqueKey');
  proxyPosts[0][uniqueKey] = 'Unique Value';
  print('First post unique key value:', proxyPosts[0][uniqueKey]);
})();
