 
async function fetchAndProcessData() {
  try {
     
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();

     
    const wordCount = posts
      .map(post => post.body.split(' ').length)  
      .reduce((acc, count) => acc + count, 0);  

    print(`Total words in all posts: ${wordCount}`);

     
    const uniqueUserIds = new Set(posts.map(post => post.userId));
    print(`Unique user IDs: ${[...uniqueUserIds].join(', ')}`);

     
    function* postGenerator() {
      for (const post of posts) {
        yield `${post.title}: ${post.body.slice(0, 30)}...`;
      }
    }

    const generator = postGenerator();
    print('First 5 posts preview:');
    for (let i = 0; i < 5; i++) {
      print(generator.next().value);
    }

  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
}

 
const targetObject = { name: "JavaScript", type: "Programming Language" };
const handler = {
  get: (obj, prop) => {
    if (prop in obj) {
      print(`Accessing property '${prop}': ${obj[prop]}`);
      return obj[prop];
    } else {
      print(`Property '${prop}' does not exist`);
    }
  },
  set: (obj, prop, value) => {
    print(`Setting property '${prop}' to '${value}'`);
    obj[prop] = value;
    return true;
  }
};
const proxyObject = new Proxy(targetObject, handler);

proxyObject.name;  
proxyObject.level = 'Advanced';  

 
fetchAndProcessData();
