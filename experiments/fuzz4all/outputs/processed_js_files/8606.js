Certainly! Here's a JavaScript program that uses several advanced features like async/await, Promises, destructuring, and the Spread/Rest operator.

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

const processUsers = ({ results }) => {
  const [firstUser, ...restUsers] = results;
  print('First user:', firstUser);

  const formattedUsers = restUsers.map(({ name: { first, last }, email }) => ({
    fullName: `${first} ${last}`,
    email,
  }));

  return formattedUsers;
};

const logData = (data) => {
  print('Formatted user data:', data);
};

(async () => {
  const url = 'https: 
  try {
    const data = await fetchData(url);
    const users = processUsers(data);
    logData(users);
  } catch (error) {
    console.error(error.message);
  }
})();

This program fetches data from an API, processes it using destructuring and the spread/rest operator, and then logs the formatted data to the console.