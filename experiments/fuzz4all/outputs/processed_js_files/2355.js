 

 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: { id: 1, name: "Jane Doe" },
        posts: [
          { id: 101, title: "First Post", content: "Hello, world!" },
          { id: 102, title: "Second Post", content: "JavaScript is awesome!" },
        ],
      });
    }, 1000);
  });
};

 
const logHandler = {
  get: (target, property) => {
    print(`Getting property ${property}`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Setting property ${property} to ${value}`);
    target[property] = value;
    return true;
  },
};

 
const showUserData = async () => {
  try {
    const { user, posts } = await fetchData();  
    const userProxy = new Proxy(user, logHandler);

     
    print(`User: ${userProxy.name}, ID: ${userProxy.id}`);
    
     
    const updatedPosts = [...posts, { id: 103, title: "Third Post", content: "Advanced JS features!" }];
    updatedPosts.forEach(({ id, title }) => print(`Post ${id}: ${title}`));

  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

showUserData();
