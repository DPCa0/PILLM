 
const fetchData = async (url, timeout = 5000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
};

 
const processUserData = ({ name, ...rest }) => {
  print(`Processing data for ${name}`);
  return {
    userName: name,
    ...rest,
    processedAt: new Date().toISOString(),
  };
};

 
(async () => {
  const urls = [
    'https://jsonplaceholder.typicode.com/users/1',
    'https://jsonplaceholder.typicode.com/users/2',
  ];
  
  try {
    const data = await Promise.all(urls.map(url => fetchData(url)));
    const processedData = data.map(user => processUserData(user));

     
    const [firstUser, secondUser] = processedData;
    print('First User:', firstUser);
    print('Second User:', secondUser);
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
