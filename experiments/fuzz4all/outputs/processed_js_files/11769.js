const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};

const processData = async () => {
  try {
    const [userData, postsData] = await Promise.all([
      fetchData('https://jsonplaceholder.typicode.com/users'),
      fetchData('https://jsonplaceholder.typicode.com/posts')
    ]);

    const userPosts = userData.map(user => ({
      ...user,
      posts: postsData.filter(post => post.userId === user.id)
    }));

    const activeUsers = userPosts.filter(user => user.posts.length > 2);

    const result = activeUsers.reduce((acc, user) => {
      acc[user.name] = user.posts.map(post => post.title);
      return acc;
    }, {});

    print(result);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
const monitorArray = (arr) => new Proxy(arr, {
  get(target, prop) {
    print(`Accessed index ${prop}`);
    return target[prop];
  },
  set(target, prop, value) {
    print(`Set index ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
});

const monitoredArray = monitorArray([1, 2, 3, 4]);
monitoredArray[2];
monitoredArray[3] = 42;

processData();
