 

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Fetch error: ${error.message}`);
  }
};

const processUsers = async () => {
  const apiUrl = 'https://jsonplaceholder.typicode.com/users';
  
  try {
    const users = await fetchData(apiUrl);
    
    if (users) {
      users
        .filter(({ address: { geo: { lat } } }) => parseFloat(lat) > 0)
        .map(({ name, email, address: { city } }) => {
          print(`Name: ${name}, Email: ${email}, City: ${city}`);
        });
    }
  } catch (error) {
    console.error(`Process error: ${error.message}`);
  }
};

processUsers();
