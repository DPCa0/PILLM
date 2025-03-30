 
const fetchData = async () => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/posts';

     
    const [posts, users] = await Promise.all([
      fetch(url).then(res => res.json()),
      fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json())
    ]);

     
    const userPosts = new Map();
    users.forEach(user => {
      const userPostSet = new Set(posts.filter(post => post.userId === user.id));
      userPosts.set(user.name, userPostSet);
    });

     
    for (const [userName, postSet] of userPosts) {
      print(`User: ${userName} has the following posts:`);
      postSet.forEach(post => {
        const { id, title } = post;
        print(`  Post ID: ${id}, Title: ${title}`);
      });
    }

     
    const handler = {
      get: (target, property) => {
        if (property in target) {
          return target[property];
        } else {
          console.warn(`Property '${property}' not found`);
          return 'Default Value';
        }
      }
    };
    const proxyUser = new Proxy(users[0], handler);
    print(`Proxy User Name: ${proxyUser.name}`);  
    print(`Proxy User Not Found: ${proxyUser.nonExistentProperty}`);  

  } catch (error) {
    console.error('An error occurred:', error);
  }
};

 
fetchData();
