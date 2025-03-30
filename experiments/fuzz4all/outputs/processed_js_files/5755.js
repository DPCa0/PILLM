 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch data: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Error: ${error}`);
    return null;
  }
};

const processUserData = ({ name, email, ...rest }) => {
  return `User Info:
    Name: ${name}
    Email: ${email}
    Details: ${JSON.stringify(rest, null, 2)}`;
};

const displayData = async () => {
  const url = 'https://jsonplaceholder.typicode.com/users/1';
  const userData = await fetchData(url);
  
  if (userData) {
    print(processUserData(userData));
  }
};

displayData();
