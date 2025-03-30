const asyncOperation = (delay, result) => 
  new Promise(resolve => setTimeout(() => resolve(result), delay));

const fetchUserData = async (userId) => {
  const user = await asyncOperation(1000, { id: userId, name: 'Alice' });
  return user;
};

const fetchUserPosts = async (userId) => {
  const posts = await asyncOperation(1000, [
    { userId, title: 'First Post' },
    { userId, title: 'Second Post' }
  ]);
  return posts;
};

(async () => {
  try {
    const userId = 1;
    const [user, posts] = await Promise.all([
      fetchUserData(userId),
      fetchUserPosts(userId)
    ]);

    const userWithPosts = {
      ...user,
      posts: posts.map(({ title }) => ({ title }))
    };

    print(userWithPosts);

    const proxyHandler = {
      get: (obj, prop) => (prop in obj ? obj[prop] : 'Property does not exist'),
      set: (obj, prop, value) => {
        if (typeof value === 'string') {
          obj[prop] = value;
          return true;
        } else {
          console.error(`Cannot set non-string value for property ${prop}`);
          return false;
        }
      }
    };

    const proxiedUser = new Proxy(userWithPosts, proxyHandler);
    print(proxiedUser.name);  
    print(proxiedUser.age);  

    proxiedUser.newField = 'This works!';
    print(proxiedUser.newField);  

    proxiedUser.newField = 123;  

  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
