 

const fetchData = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = {
        user: { id: 1, name: 'Alice' },
        posts: [
          { id: 101, title: 'Async in JS' },
          { id: 102, title: 'Advanced JavaScript' }
        ]
      };
      resolve(data);
    }, 1000);
  });
};

const userHandler = {
  get: (target, prop) => {
    return prop in target ? target[prop] : 'Unknown property';
  }
};

const main = async () => {
  try {
    const data = await fetchData();
    const { user, posts } = data;
    const proxyUser = new Proxy(user, userHandler);

    print(`User: ${proxyUser.name}`);
    
    posts.forEach(({ id, title }) => {
      print(`Post [${id}]: ${title}`);
    });
  } catch (error) {
    console.error('Error:', error);
  }
};

main();
