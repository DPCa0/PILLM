const fetch = require('node-fetch');

 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

 
async function* userGenerator(url) {
  const data = await fetchData(url);
  for (const user of data) {
    yield user;
  }
}

 
const processUserData = async (url) => {
  const userGen = userGenerator(url);
  for await (const user of userGen) {
    const { id, name, email } = user;
    print(`User ID: ${id}, Name: ${name}, Email: ${email}`);
  }

  const sampleUser = { id: 101, name: 'John Doe', email: 'john.doe@example.com' };
  const newUser = { ...sampleUser, email: 'new.email@example.com' };

  print('Sample User:', newUser);

  const userIds = Array.from(Array(5).keys()).map(id => `user-${id}`);
  print('User IDs:', userIds);
};

 
const apiUrl = 'https://jsonplaceholder.typicode.com/users';

 
processUserData(apiUrl);

Note: This code uses Node.js and requires the `node-fetch` package for making HTTP requests.