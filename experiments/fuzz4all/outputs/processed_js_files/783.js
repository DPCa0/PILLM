const fetchData = async (url) => {
   
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

const processData = (data) => {
   
  const users = data.map(({ name: { first, last }, location: { city }, email }) => ({
    fullName: `${first} ${last}`,
    city,
    email,
  }));
  
   
  return users
    .filter(({ city }) => city === 'New York')
    .map(({ fullName, email }) => `${fullName} <${email}>`)
    .reduce((acc, curr) => acc + curr + '\n', '');
};

(async () => {
  const url = 'https://randomuser.me/api/?results=10';
  
   
  const data = await fetchData(url);
  
  if (data) {
    const processedData = processData(data.results);
    print("Processed Users from New York:\n", processedData);
  }
})();
