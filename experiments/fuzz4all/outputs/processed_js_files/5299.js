 

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error fetching data: ${response.statusText}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const processUserData = ({ name, email, address: { city } }) => {
  return `User ${name} lives in ${city}. Contact: ${email}`;
};

const getUsersWithCity = async () => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const users = await fetchData(url);
    if (users) {
      const userMessages = users.map(processUserData);
      print(userMessages.join('\n'));
    }
  } catch (error) {
    console.error('Error processing user data:', error);
  }
};

getUsersWithCity();
