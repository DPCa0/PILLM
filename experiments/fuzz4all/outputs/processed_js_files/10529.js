Certainly! Below is a JavaScript program that makes use of advanced features like promises, async/await, destructuring, arrow functions, and higher-order functions. This example involves fetching data from a fake API and processing it.

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const processUserData = async () => {
  try {
    const usersUrl = 'https://jsonplaceholder.typicode.com/users';
    const postsUrl = 'https://jsonplaceholder.typicode.com/posts';

    const [users, posts] = await Promise.all([fetchData(usersUrl), fetchData(postsUrl)]);
    
    const userPostsMap = posts.reduce((acc, { userId, title }) => {
      acc[userId] = acc[userId] || [];
      acc[userId].push(title);
      return acc;
    }, {});

    const enhancedUsers = users.map(({ id, name, email }) => ({
      id,
      name,
      email,
      posts: userPostsMap[id] || [],
    }));

    const logUser = ({ name, email, posts }) => {
      print(`Name: ${name}, Email: ${email}`);
      print('Posts:', posts.join(', '));
    };

    enhancedUsers.forEach(logUser);

  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
};

processUserData();

This code fetches user and post data from a public API, maps the posts to their respective users, and logs the information to the console. It demonstrates the use of promises, async/await for asynchronous data fetching, destructuring, and various array methods like `reduce`, `map`, and `forEach`.