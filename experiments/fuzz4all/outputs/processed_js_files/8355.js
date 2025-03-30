 

 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          name: 'Jane Doe',
          age: 28,
          location: 'New York',
        },
        posts: [
          { title: 'Async JavaScript', likes: 120 },
          { title: 'Understanding Proxies', likes: 95 },
        ],
      });
    }, 1000);
  });
};

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessing ${prop}:`, target[prop]);
      return target[prop];
    } else {
      throw new Error(`Property ${prop} does not exist.`);
    }
  },
  set: (target, prop, value) => {
    if (prop === 'age' && (value < 0 || value > 120)) {
      throw new Error('Invalid age value');
    }
    print(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  },
};

 
const main = async () => {
  try {
     
    const { user, posts } = await fetchData();

     
    const proxiedUser = new Proxy(user, handler);

     
    print(`User Name: ${proxiedUser.name}`);
    proxiedUser.age = 29;  
     

     
    posts.forEach(({ title, likes }) => {
      print(`Post: "${title}" has ${likes} likes.`);
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
};

 
main();
