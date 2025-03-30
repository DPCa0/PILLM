Certainly! Here's a JavaScript program that uses advanced features such as async/await, Promises, destructuring, and the spread operator:

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch Error:', error);
  }
};

const processData = async (url) => {
  const data = await fetchData(url);
  if (!data) return;

  const { users, posts } = data;
  
  const processedUsers = users.map(({ id, name, email, ...rest }) => ({
    id,
    name,
    email,
    metadata: rest,
  }));

  const processedPosts = posts.map((post) => {
    const { title, body, ...rest } = post;
    return { title: title.toUpperCase(), body, ...rest };
  });

  return { processedUsers, processedPosts };
};

const displayResults = ({ processedUsers, processedPosts }) => {
  print('Processed Users:', processedUsers);
  print('Processed Posts:', processedPosts);
};

(async () => {
  const url = 'https: 
  const endpoints = ['/users', '/posts'];

  const promises = endpoints.map((endpoint) => fetchData(`${url}${endpoint}`));
  const [users, posts] = await Promise.all(promises);

  const data = { users, posts };
  const results = await processData(data);

  if (results) displayResults(results);
})();

Make sure to replace the URL and endpoints with ones that match the API you're interacting with, as this code is set up for a hypothetical API.