const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
};

const debounce = (func, delay) => {
  let debounceTimer;
  return (...args) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(this, args), delay);
  };
};

const uniqueValues = (array) => [...new Set(array)];

const advancedAsyncOps = async () => {
  try {
    const data = await Promise.all([
      fetchData('https://jsonplaceholder.typicode.com/posts'),
      fetchData('https://jsonplaceholder.typicode.com/users')
    ]);

    const [posts, users] = data;

    const userPosts = users.map(user => {
      const userSpecificPosts = posts.filter(post => post.userId === user.id);
      return { ...user, posts: userSpecificPosts };
    });

    const flatUserIds = userPosts.flatMap(user => user.posts.map(post => post.userId));
    print('Unique User IDs:', uniqueValues(flatUserIds));

  } catch (error) {
    console.error('Error in fetching data:', error);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('debouncedInput');
  input.addEventListener('input', debounce((event) => {
    print('Input value:', event.target.value);
  }, 300));
});

advancedAsyncOps();
