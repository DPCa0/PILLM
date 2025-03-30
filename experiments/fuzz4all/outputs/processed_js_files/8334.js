const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const data = await response.json();
  return data;
};

const processData = ({ users }) => {
  const userNames = users.map(user => user.name);
  const uniqueNames = new Set(userNames);
  return [...uniqueNames].sort((a, b) => a.localeCompare(b));
};

const logNamesWithDelay = async (names) => {
  for (const name of names) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    print(name);
  }
};

(async () => {
  try {
    const apiData = await fetchData('https://jsonplaceholder.typicode.com/users');
    const sortedUniqueNames = processData({ users: apiData });
    await logNamesWithDelay(sortedUniqueNames);
  } catch (error) {
    console.error(`Failed to process data: ${error.message}`);
  }
})();
