Certainly! Below is a JavaScript program that uses advanced features such as asynchronous functions, Promises, destructuring, and the spread operator:

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const processData = (data) => {
  return data.map(({ id, title, body }) => ({ id, title, body }));
};

const displayData = async (url) => {
  try {
    const data = await fetchData(url);
    const processedData = processData(data);

    processedData.forEach(({ id, ...details }) => {
      print(`ID: ${id}`);
      print(`Details:`, details);
      print('----------');
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const url = 'https://jsonplaceholder.typicode.com/posts';
displayData(url);

This program fetches data from a public API, processes it by extracting specific fields using destructuring, and then displays the result with the help of the spread operator. The program also includes error handling for failed network requests.