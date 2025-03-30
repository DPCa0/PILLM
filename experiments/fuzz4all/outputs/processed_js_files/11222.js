 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: { name: 'Alice', age: 30 },
        posts: [
          { id: 1, title: 'Async Programming', content: 'Lorem ipsum...' },
          { id: 2, title: 'JavaScript Tricks', content: 'Dolor sit amet...' }
        ]
      });
    }, 1000);
  });
};

const displayUserData = async () => {
  try {
    const { user: { name, age }, posts } = await fetchData();
    print(`User: ${name}, Age: ${age}`);

    posts.forEach(({ id, title }) => {
      print(`Post #${id}: ${title}`);
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

 
const loggerHandler = {
  get(target, propKey, receiver) {
    const origMethod = target[propKey];
    return function (...args) {
      print(`Called ${propKey} with ${JSON.stringify(args)}`);
      return origMethod.apply(this, args);
    };
  }
};

const proxiedDisplay = new Proxy({ displayUserData }, loggerHandler);
proxiedDisplay.displayUserData();
