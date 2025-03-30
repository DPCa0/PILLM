 

async function fetchData(url) {
   
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}

function processData(data) {
   
  return data.map(({ id, name, email }) => {
    return {
      id,
      name: name.toUpperCase(),
      email: email.toLowerCase(),
    };
  });
}

function displayData(users) {
   
  users.forEach(user => {
    print(`User: ${user.name}, Email: ${user.email}`);
  });
}

(async () => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const data = await fetchData(url);
    const processedData = processData(data);
    displayData(processedData);
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
})();
