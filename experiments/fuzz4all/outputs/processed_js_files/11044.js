const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const processData = ({ data, transform }) => {
  return data.reduce((acc, item) => {
    const key = transform(item);
    acc[key] = acc[key] ? acc[key] + 1 : 1;
    return acc;
  }, {});
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const runComplexOperation = async () => {
  try {
    const [users, posts] = await Promise.all([
      fetchData('https://jsonplaceholder.typicode.com/users'),
      fetchData('https://jsonplaceholder.typicode.com/posts')
    ]);

    print('Fetched data:', { users, posts });
    
    const userPosts = processData({
      data: posts,
      transform: post => users.find(user => user.id === post.userId).name
    });

    print('User post counts:', userPosts);
  } catch (error) {
    console.error('Error:', error);
  }
};

const memoize = fn => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (!cache.has(key)) {
      cache.set(key, fn(...args));
    }
    return cache.get(key);
  };
};

const fibonacci = memoize(n => n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2));

(async () => {
  print('Starting complex operation...');
  await delay(2000);
  await runComplexOperation();
  print('10th Fibonacci number:', fibonacci(10));
})();
