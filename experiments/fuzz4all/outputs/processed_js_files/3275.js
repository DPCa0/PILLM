const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const processData = async () => {
  try {
    const [users, posts] = await Promise.all([
      fetchData('https://jsonplaceholder.typicode.com/users'),
      fetchData('https://jsonplaceholder.typicode.com/posts')
    ]);

    const userPosts = users.map(user => ({
      ...user,
      posts: posts.filter(post => post.userId === user.id)
    }));

    const totalPosts = userPosts.reduce((acc, user) => acc + user.posts.length, 0);

    print(`Total users: ${users.length}`);
    print(`Total posts: ${totalPosts}`);
    print(userPosts);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

processData();

 
const handler = {
  get: (target, prop) => {
    print(`Getting property ${String(prop)}`);
    return target[prop];
  },
  set: (target, prop, value) => {
    print(`Setting property ${String(prop)} to ${value}`);
    target[prop] = value;
    return true;
  }
};

const targetObject = {
  name: 'John Doe',
  age: 30
};

const proxiedObject = new Proxy(targetObject, handler);
proxiedObject.name;  
proxiedObject.age = 31;  
print(proxiedObject.name);  

 
function* fibonacciSequence(limit) {
  let [prev, curr] = [0, 1];
  while (curr <= limit) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

const fibSequence = fibonacciSequence(100);
for (const num of fibSequence) {
  print(num);
}
